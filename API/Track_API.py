from cmath import sqrt
import math
from turtle import distance


def Track(Dist):
    r = Dist/2
    dist_bends = math.pi * Dist
    dist_straight = 250-dist_bends
    bend = dist_bends / 250 * 100
    distance_from_apex = 0.4
    a = r + distance_from_apex
    Ram_Ellipse_perimeter_black = math.pi * (3*(r+r) - math.sqrt((3*r+r) * (r+3*r)))
    Ram_Ellipse_perimeter_travelled = math.pi * (3*(a+r) - math.sqrt((3*a+r) * (a+3*r)))
    extra_distant_travelled = Ram_Ellipse_perimeter_travelled - Ram_Ellipse_perimeter_black
    multiplier = 250/(250 + extra_distant_travelled)
    
    # return all the values
    return {
        'r': r,
        'dist_bends': dist_bends,
        'dist_straight': dist_straight,
        'bend': bend,
        'distance_from_apex': distance_from_apex,
        'a': a,
        'Ram_Ellipse_perimeter_black': Ram_Ellipse_perimeter_black,
        'Ram_Ellipse_perimeter_travelled': Ram_Ellipse_perimeter_travelled,
        'extra_distant_travelled': extra_distant_travelled,
        'multiplier': multiplier
    }