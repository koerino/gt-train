class User:
    def __init__(self, username):
        self.username = username
    def getUserName(self):
        return self.username
    def setUserName(self, username):
        self.username = username

class Schedules:
    def __init__(self, sches):
        self.sches = sches
    def getSches(self):
        return self.sches
    def setSches(self, sches):
        self.sches = sches
        
class Reviews:
    def __init__(self, reviews):
        self.reviews = reviews
    def getReviews(self):
        return self.reviews
    def setReviews(self, reviews):
        self.reviews = reviews
        
class Departures:
    def __init__(self, deps):
        self.deps = deps
    def getDeps(self):
        return self.deps
    def setDeps(self, deps):
        self.deps = deps