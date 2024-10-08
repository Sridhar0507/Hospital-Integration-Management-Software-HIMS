
from pathlib import Path
import mysql.connector
from mysql.connector import errorcode
import django

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-*^3rertep@4=xw8+gemuzk+)5q8-x^_3n)3*!c+1@b88q6*=m&'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["*"]

CORS_ALLOWED_ORIGINS=['http://localhost:3000','https://hims.vesoft.co.in']
    


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'rest_framework',
    'django_apscheduler',
    'Masters',
    'Frontoffice',
    'IP',
    'LeninManagement',
    'OutPatient',
    'Workbench',
    'MisReports',
    'Ip_Workbench',
    'Inventory',
]
# Increase the maximum size of request body allowed for file uploads
DATA_UPLOAD_MAX_MEMORY_SIZE = 1024 * 1024 * 20  # 20 MB (for example)


MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'Backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'Backend.wsgi.application'

CORS_ALLOW_HEADERS = [
    'content-type',
    'authorization',
    'accept',
    'x-requested-with',
    'Apikey',  # Allow custom header api_key
    'Apipassword',  # Allow custom header api_password
    'Sessionid',
]

# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'Chirayo_backend_trial_3',
        'USER': 'root',
        'PASSWORD': '',
        'HOST': 'localhost',
        'PORT': '3306',
         'OPTIONS': {
            'connect_timeout': 60,  # Increase the connection timeout
            'read_timeout': 60,     # Increase the read timeout
            'write_timeout': 60,    # Increase the write timeout
            # 'init_command': "SET sql_mode='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION'",
        }
    }
}

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.mysql',
#         'NAME': 'secdomain_trail_chirayu',
#        'USER': 'secdomain_demo',
#         'PASSWORD': '12345',
#         'HOST': 'localhost',
#         'PORT': '3306',
#          'OPTIONS': {
#             'connect_timeout': 60,  # Increase the connection timeout
#             'read_timeout': 60,     # Increase the read timeout
#             'write_timeout': 60,    # Increase the write timeout
#         }
#     }
# }

def create_database_if_not_exists():
    django.setup()  # Ensure Django settings are loaded

    try:
        connection = mysql.connector.connect(
            host=DATABASES['default']['HOST'],
            user=DATABASES['default']['USER'],
            password=DATABASES['default']['PASSWORD'],
            port=DATABASES['default']['PORT'],
        )
        cursor = connection.cursor()

        # Create database if it does not exist
        cursor.execute(f"CREATE DATABASE IF NOT EXISTS {DATABASES['default']['NAME']}")
        cursor.execute(f"USE {DATABASES['default']['NAME']}")
        
        cursor.close()
        connection.close()
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your username or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print(f"Database does not exist and could not be created: {err}")
        else:
            print(err)


create_database_if_not_exists()


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Kolkata'
USE_TZ = False





# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = 'static/'



# REACT_APP_BUILD_PATH = "frontend/build"
# STATIC_URL = 'django_static/'


# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
