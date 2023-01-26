from rest_framework import serializers
from . import models

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Product
        fields = '__all__'


class CartItemSerializer(serializers.ModelSerializer):
    
    product = serializers.PrimaryKeyRelatedField(many=False,queryset=models.Product.objects.all())
    class Meta:
        model = models.CartItem
        fields = ['id','product', 'amount']
    
    


class CartSerializer(serializers.ModelSerializer):
    cart_items = CartItemSerializer(many=True)
    class Meta:
        model = models.Cart
        fields = ['id','user', 'cart_items']

    def create(self, validated_data):
        cart_items_data = validated_data.pop('cart_items')
        cart = models.Cart.objects.create(**validated_data)
        for cart_item_data in cart_items_data:
            # product_data = cart_item_data.pop('product')
            # print(cart_item_data)
            models.CartItem.objects.create(cart=cart, **cart_item_data)
        return cart
