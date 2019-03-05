from django.db import models

# Create your models here.

class Country(models.Model):
    name = models.CharField(max_length=255)
    
    class Meta:
        managed = True
        db_table = 'Country'


class City(models.Model):
    name = models.CharField(max_length=255)
    country = models.ForeignKey('Country', on_delete=models.DO_NOTHING, null=True)
    weathermapId = models.IntegerField(unique=True)

    class Meta:
        managed = True
        db_table = 'City'