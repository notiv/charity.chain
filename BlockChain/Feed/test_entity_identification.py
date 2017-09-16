# -*- coding: utf-8 -*-

from SearchReuters.EntityIdentification import EntityIdentification

def test_entity_identification(self):
    ei = EntityIdentification()
    ei.identify_entity(input_text = '''
        Venezuela has offered $5 million to victims of HurricaneHarvey in the United States 
        despite a major economic crisis in the SouthAmerican country that has left millions 
        short of food and medicine.Venezuela's U.S.-based oil subsidiary Citgo, a unit of state 
        oil companyPDVSA, will cooperate with local authorities in Houston to distribute thefunds, 
        Foreign Minister Jorge Arreaza said on state television.Venezuela's socialist government 
        has in the past given subsidized heating oilto poor Americans and sent aid to victims of 
        Hurricane Katrina in 2005.Venezuela's already strained relations with the United States 
        took a nosedivethis year with Washington imposing various sanctions against President Nicolas
        Maduro's cash-strapped government.President Donald Trump went as far as to say a military 
        intervention may be onthe cards, though U.S. officials quickly rolled that idea back.
        Venezuela is suffering a fourth year of brutal recession, and has been rockedby political 
        turmoil and mass street protests against Maduro.Harvey, now downgraded to a tropical storm, 
        bore down on eastern Texas andLouisiana on Wednesday, bringing the kind of catastrophic 
        downpours thatparalyzed the oil hub of Houston with record rainfall and drove tens ofthousands 
        of people from their homes.(Reporting by Girish Gupta; Editing by Andrew Cawthorne and Alistair Bell)
                        ''')

if __name__ == '__main__':
    test_entity_identification()_