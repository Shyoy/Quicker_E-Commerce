import imp
from django.db import models
from io import BytesIO
from PIL import Image
from django.core.files import File
from datetime import datetime
#image compression method
from os import listdir
from django.conf import settings

class ImageHandler:
    IMG_FOLDER_NAME = "products/"
    @staticmethod
    def path(instance:object, filename:str) -> str:
        '''
        Returns a path to the image,\ 
        Made to be used inside ImageField as upload_to=path
        '''
        time = int(datetime.now().timestamp())
        # print(instance.image)
        extension = filename.split('.')[-1]
        # file will be uploaded to MEDIA_ROOT / <barcode>/<filename>
        return f'{__class__.IMG_FOLDER_NAME}{instance.barcode}_{time}_{instance.name}.{extension}'
    
    @staticmethod
    def compress(image:object):
        method= Image.Transform.MESH
        im = Image.open(image)
        im_io = BytesIO() 
        im = im.transform((640, 480), Image.EXTENT,
            data =[10, 0,im.width , im.height ])
        im = im.convert('RGB')
        im.save(im_io, 'JPEG', quality=40) 
        new_image = File(im_io, name=image.name)
        return new_image


def del_broken_products(products):
    path = settings.MEDIA_URL.split('/')[1] + '/' + ImageHandler.IMG_FOLDER_NAME
    images_names = [ImageHandler.IMG_FOLDER_NAME+name for name in listdir(path)]
    print(images_names)
    broken_products = products.exclude(image__in=images_names)
    if broken_products.count() > 0:
        broken_products.delete()
    print(broken_products)
   