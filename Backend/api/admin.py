from django.contrib import admin
from apps.products import models as prod_models
from apps.accounts import models as acc_models
# from accounts.models import 

# Register your models here.
admin.site.register(prod_models.Product)
# admin.site.register(acc_models.admin)