
# # from django.contrib.auth.models import Group
# # Signals:
# from django.dispatch import receiver
# from django.db.models.signals import post_save, pre_save, m2m_changed
# from django.db.models import F, Q

from apps.products import models as prod_models
from django.db.models.signals import post_delete, pre_save, post_save
from django.dispatch import receiver
from apps.products.models import Product
from .utils import ImageHandler
from django.core.exceptions import ValidationError

@receiver(post_delete, sender=prod_models.Product)
def post_delete_image(sender, instance, *args, **kwargs):
    """ Clean Old Image file """
    print('delete image from {}'.format(instance.id))
    try:
        instance.image.delete(save=False)
    except Exception as e:
        print(f"Error deleting: {e}")


@receiver(pre_save, sender=prod_models.Product)
def pre_save_image(sender, instance, *args, **kwargs):
    """ Clean Old Image file when updating """
    if instance.id:
        try:
            old_img = instance.__class__.objects.get(id=instance.id).image.path
            try:
                new_img = instance.image.path
            except:
                new_img = None
            if new_img != old_img:
                import os
                if os.path.exists(old_img):
                    os.remove(old_img)
        except Exception as e:
            print(e)
    
    if hasattr(instance.image.file, 'image'):
        print(f"Before {instance.image.size/1024/1024}MB")
        w, h = instance.image.file.image.size
        img_size_mb = instance.image.size/1024/1024
        if img_size_mb > 0.3 or w > 640 or h > 480:
            new_image = ImageHandler.compress(instance.image)
            instance.image = new_image
        print(f"After: {instance.image.size/1024/1024}MB")



@receiver(pre_save, sender=prod_models.CartItem)
def pre_save_item(instance, *args, **kwargs):
    """ When item changed change product amount by the same item amount """
    if instance.id:
        old_amount =  type(instance).objects.get(id=instance.id).amount
        new_amount = instance.amount
        instance.product.amount += old_amount - new_amount
        instance.product.save()
        print(instance.product.name,'New Amount:',instance.product.amount)

@receiver(post_save, sender=prod_models.CartItem)
def post_save_item(instance, created, *args, **kwargs):
    """ When added new item subtract item amount from product amount"""
    if created:
        product = instance.product
        product.amount -= instance.amount
        product.save()
        print(product.name,'New Amount:',product.amount)

@receiver(post_delete, sender=prod_models.CartItem)
def post_delete_item(instance, *args, **kwargs):
    '''when item is deleted then its amount used is now added back to the product amount'''
    product = instance.product
    product.amount += instance.amount
    product.save()
    print(product.name,'New Amount:',product.amount)