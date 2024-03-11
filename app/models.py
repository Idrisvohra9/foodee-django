from django.db import models


class MenuCategory(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    display_picture = models.URLField(blank=False, null=False)

    def __str__(self):
        return self.name


class MenuItem(models.Model):
    category = models.ForeignKey(MenuCategory, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=False, null=False)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    display_picture = models.URLField(blank=False, null=False)
    is_featured = models.BooleanField(default=False)
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Event(models.Model):
    title = models.CharField(max_length=100)
    date = models.DateTimeField()
    description = models.TextField(blank=False, null=False)
    is_deleted = models.BooleanField(default=False)

    def formatted_date(self):
        # Use strftime to format the date according to your desired format
        return self.date.strftime("%B %d, %Y, %H:%M").replace("{0}", self.ordinal(self.date.day))

    def ordinal(self, day):
        if 10 <= day % 100 <= 20:
            suffix = 'th'
        else:
            suffix = {1: 'st', 2: 'nd', 3: 'rd'}.get(day % 10, 'th')
        return f"{day}{suffix}"

    def __str__(self):
        return self.formatted_date()


class WaitList(models.Model):
    busy = models.BooleanField(default=False)


class Customer(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField(null=False, blank=False,
                              unique=True, max_length=240)
    phone_no = models.CharField(max_length=20,null=False, blank=False)

class Reservation(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True)
    number_of_guests = models.CharField(max_length=5)
    date_time = models.DateTimeField()
    occasion = models.CharField(max_length=100)
    special_requests = models.TextField(max_length=200)
    created_at = models.DateTimeField(auto_now=True)
    expired = models.BooleanField(default=False)
    were_present = models.BooleanField(default=False)