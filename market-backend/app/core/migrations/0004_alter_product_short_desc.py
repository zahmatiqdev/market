# Generated by Django 3.2.16 on 2022-12-27 12:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_unit_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='short_desc',
            field=models.CharField(blank=True, max_length=250),
        ),
    ]
