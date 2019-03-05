from difflib import get_close_matches
import json
from django.http import JsonResponse

from core.models import Country, City
from core.Serializers.citySerializer import CitySerializer


# Create your views here.

def sayHi(_req):
    response = {
        'status': True,
        'message': 'Hi'
    }
    return JsonResponse(response, status=200)

def migrate(_req):
    response = {
        'status': 'True',
        'message': 'Success!'
    }

    with open('core/city.list.json') as file:
        data = json.load(file)
        print('starting migration...')
        print('total cities: ', len(data))
        for i, cityInfo in enumerate(data):
            city = City()
            city.weathermapId = cityInfo['id']
            country = Country.objects.filter(name=cityInfo['country']).first()
            if country is None:
                country = Country()
                country.name = cityInfo['country']
                country.save()
            city.country = country
            city.name = cityInfo['name']
            city.save()
            if (i+1) % 500 == 0:
                print(i+1, ' cities sorted.')

    return JsonResponse(response, status=200)


def getSimilarCities(_req, city):
    response = {
        'status': 'True',
        'message': 'Success!'
    }
    cities = City.objects.all()
    cityNames = [city.name for city in cities]
    options = get_close_matches(city, cityNames, n=5, cutoff=0.1)
    print('cities: ', options)
    candidates = City.objects.filter(name__in = options)
    candidatesSerialized = CitySerializer(candidates, many=True).data
    
    response['cities'] = candidatesSerialized
    return JsonResponse(response, status=200)

