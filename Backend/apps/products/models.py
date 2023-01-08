from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.exceptions import ValidationError
from django.core.validators import (MinValueValidator,
                                    MaxLengthValidator,
                                    MinLengthValidator,
                                    FileExtensionValidator,
                                    ValidationError,
                                    validate_image_file_extension)
from .services.validators import DigitValidator , ImageValidator
from .services.utils import ImageHandler

# Create your models here.

class Product(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=120)
    barcode = models.CharField(validators=[MinLengthValidator(6),DigitValidator()], max_length=18,  unique=True)
    price = models.FloatField(validators=[MinValueValidator(0.5)])
    amount = models.IntegerField(default=1)
    image = models.ImageField(upload_to=ImageHandler.path,validators=[ImageValidator(3),validate_image_file_extension])

    class Meta:
        ordering = ['created']

    def __str__(self):
        return self.name
