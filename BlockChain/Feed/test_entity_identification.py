# -*- coding: utf-8 -*-

from SearchReuters.EntityIdentification import EntityIdentification
import json

def test_entity_identification():
    ei = EntityIdentification()
    ei.identify_entity('''
        ABUJA (Reuters) - Nigeria's armed forces said on Friday a group campaigningfor 
        the secession of a part of southeastern Nigeria formerly known as Biafrahad been categorized 
        as a "terrorist organization".The move follows days of tension in which members of the group 
        accused thearmy of laying siege to their leader's home, which the army denied. A curfew 
        was imposed in Abia state where the residence is located.The Indigenous People of Biafra (IPOB) 
        group has stepped up calls forsecession since its leader, Nnamdi Kanu, was released on bail 
        in April afterbeing detained nearly two years on charges of criminal conspiracy and belonging 
        to an illegal society. Secessionist sentiment has simmered in the region since the Biafra 
        separatist rebellion plunged Africa's most populous country into a civil war in 1967-70 that 
        killed an estimated one million people.The military presence in southeastern Nigeria has increased 
        in the last fewweeks as part of an operation that the military said was part of efforts to crack 
        down on crime."The Armed Forces of Nigeria wishes to confirm to the general public that IPOB 
        from all intent, plan and purpose as analyzed, is a militant terrorist organization," said 
        armed forces spokesman John Enenche in an emailed statement. The statement said IPOB had formed 
        a "Biafra secret service" a paramilitary division, extorted money from people on public roads 
        and attacked members ofthe armed forces.An IPOB spokesman was not immediately available for 
        comment. The tension is another security challenge for President Muhammadu Buhari in addition 
        to the eight-year Boko Haram jihadist insurgency in the northeast and attempts to maintain 
        a fragile ceasefire in the southern Niger Delta energy hub. Militant attacks on oil 
        facilities in the Niger Delta last year cut crude production by more than a third.
        Renewed calls for Biafran secession prompted Buhari to use his first speech after returning 
        from three months of medical leave in Britain in August to sayNigeria's unity was "not 
        negotiable". Amid mounting tensions in the region, the army on Thursday said it was 
        investigating video footage circulating on social media that purportedly showed troops at 
        a checkpoint in Abia using sticks to flog men stripped to the waist and forcing them to 
        drink muddy water. Amnesty International in 2016 accused Nigeria's security forces of killing 
        at least 150 Biafra separatists at peaceful rallies. The military and police denied the 
        allegations.(This version of the story corrects typo in headline)(Reporting by Camillus 
        Eboh; Additional reporting by Anamesere Igboeroteonwu; Writing by Alexis Akwagyiram; 
        editing by Ralph Boulton)
       '''
        # Venezuela has offered $5 million to victims of HurricaneHarvey in the United States
        # despite a major economic crisis in the SouthAmerican country that has left millions
        # short of food and medicine.Venezuela's U.S.-based oil subsidiary Citgo, a unit of state
        # oil company PDVSA, will cooperate with local authorities in Houston to distribute the funds,
        # Foreign Minister Jorge Arreaza said on state television.Venezuela's socialist government
        # has in the past given subsidized heating oil to poor Americans and sent aid to victims of
        # Hurricane Katrina in 2005.Venezuela's already strained relations with the United States
        # took a nose dive this year with Washington imposing various sanctions against President Nicolas
        # Maduro's cash-strapped government.President Donald Trump went as far as to say a military
        # intervention may be on the cards, though U.S. officials quickly rolled that idea back.
        # Venezuela is suffering a fourth year of brutal recession, and has been rocked by political
        # turmoil and mass street protests against Maduro. Harvey, now downgraded to a tropical storm,
        # bore down on eastern Texas andLouisiana on Wednesday, bringing the kind of catastrophic
        # downpours that paralyzed the oil hub of Houston with record rainfall and drove tens of thousands
        # of people from their homes.(Reporting by Girish Gupta; Editing by Andrew Cawthorne and Alistair Bell)
        #                 '''
    )

    # print(resp.status_code)

if __name__ == '__main__':
    test_entity_identification()