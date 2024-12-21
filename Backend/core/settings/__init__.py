import os



if os.environ.get("ENV_NAME") == 'Production':
    print("Settings:","Production")
    from .production import *

elif os.environ.get("ENV_NAME") == 'Staging':
    print("Settings:","Staging")
    from .staging import *

else:
    print("Settings:","Local")
    from .local import *