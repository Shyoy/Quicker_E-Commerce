from django.shortcuts import render, get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from apps.products.models import Product, Cart, Category
from apps.products.serializers import ProductSerializer, CartSerializer,CartItemSerializer,CategorySerializer
from rest_framework.parsers import FormParser ,MultiPartParser
from pprint import pprint
# from rest_framework.permissions  import IsAuthenticated

@api_view(['GET', 'POST'])
# @parser_classes([FormParser, MultiPartParser])
def product_list(request):
    """
    List all products, or create a new product.
    """
    if request.method == 'GET':
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def product_detail(request, code):
    """
    Retrieve, update or delete a code snippet.
    """
    product = get_object_or_404(Product, pk=code)

    if request.method == 'GET':
        serializer = ProductSerializer(product)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ProductSerializer(product, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def categories_list(request):
    """
    List all categories, or create a new category.
    """
    if request.method == 'GET':
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def checkout_list(request):
    if request.method == 'POST':
        cart_data = {'cart_items':request.data,'user':'userName'}
        
        serializer = CartSerializer(data=cart_data)
        # pprint(request.data)
        if serializer.is_valid():
            serializer.save()
            changed_products = [Product.objects.get(id=x['product']) for x in serializer.data['cart_items']]
            serialized_products = ProductSerializer(changed_products, many=True).data
            # print(serialized_products)
            return Response(serialized_products)
        # print('ERRORS: ', serializer.errors)
        return Response(messages=serializer.errors, status=status.HTTP_400_BAD_REQUEST)