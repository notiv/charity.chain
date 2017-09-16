# -*- coding: utf-8 -*-

from SearchReuters.EntityIdentification import EntityIdentification
import json

def test_entity_identification():
    ei = EntityIdentification()
    ei.identify_entity('''
        Venezuela has offered $5 million to victims of HurricaneHarvey in the United States 
        despite a major economic crisis in the SouthAmerican country that has left millions 
        short of food and medicine.Venezuela's U.S.-based oil subsidiary Citgo, a unit of state 
        oil company PDVSA, will cooperate with local authorities in Houston to distribute the funds, 
        Foreign Minister Jorge Arreaza said on state television.Venezuela's socialist government 
        has in the past given subsidized heating oil to poor Americans and sent aid to victims of 
        Hurricane Katrina in 2005.Venezuela's already strained relations with the United States 
        took a nose dive this year with Washington imposing various sanctions against President Nicolas
        Maduro's cash-strapped government.President Donald Trump went as far as to say a military 
        intervention may be on the cards, though U.S. officials quickly rolled that idea back.
        Venezuela is suffering a fourth year of brutal recession, and has been rocked by political 
        turmoil and mass street protests against Maduro. Harvey, now downgraded to a tropical storm, 
        bore down on eastern Texas andLouisiana on Wednesday, bringing the kind of catastrophic 
        downpours that paralyzed the oil hub of Houston with record rainfall and drove tens of thousands 
        of people from their homes.(Reporting by Girish Gupta; Editing by Andrew Cawthorne and Alistair Bell)
                        ''')

    # print(resp.status_code)

if __name__ == '__main__':
    test_entity_identification()