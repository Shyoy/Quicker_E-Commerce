
from django.core.exceptions import ValidationError
from django.utils.deconstruct import deconstructible

from django.utils.regex_helper import _lazy_re_compile
from django.utils.translation import gettext_lazy as _
from django.utils.translation import ngettext_lazy
from django.core.validators import BaseValidator


# @deconstructible
class DigitValidator(BaseValidator):
    message = _("Ensure this value %(value)s contain only digits .")
    code = "min_length"

    def __init__(self, message=None):
        self.limit_value = None
        if message:
            self.message = message

    def compare(self, cleaned, limit_value):
        return not cleaned.isdigit()

    # def clean(self, x):
    #     return len(x)




class ImageValidator(BaseValidator):
    """
    Validate whether the image file size is valid.
    """
    message = _("Max file size is %(limit_value)gMB.")
    code = "max_size"

    def __init__(self,limit_value:float=5 ,message=None):
        self.limit_value = limit_value
        if message:
            self.message = message
    
    def compare(self, fieldfile_obj, megabyte_limit):
        
        filesize = fieldfile_obj.size/1024/1024
        return filesize > megabyte_limit