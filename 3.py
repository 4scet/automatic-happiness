from selenium import webdriver
import schedule
import time
import csv

def scraping():
    driver = webdriver.Firefox()
    driver.get("https://egb.com/play/simple_bets")

    csgo = driver.find_element_by_xpath('//div[2]/div[2]/div[1]/div/div[2]/div[1]/div/div[1]/div')
    csgo.click()

    more = driver.find_element_by_xpath('//div[2]/div[2]/div[1]/div/div[2]/div[2]/button')
    more.click()

    futuremf = driver.find_element_by_xpath('//div[2]/div[2]/div[1]/div[2]/div/div[1]/button[2]')
    futuremf.click()

    # team1 = driver.find_elements_by_xpath('//div[1]/div/div[1]/div[2]/div[1]/div[1]/span')
    odds1 = driver.find_elements_by_css_selector('div.table-bets__col-1 > div.table-bets__odds > div')
    odds2 = driver.find_elements_by_css_selector('div.table-bets__col-3 > div.table-bets__odds > div')

    q1 = len(odds1)
    for i in range(q1):
        print(odds1[i].text + " : " + odds2[i].text)
    print('gotem')
    
    #driver.close()

schedule.every(5).seconds.do(scraping)
while True:
    schedule.run_pending()
    time.sleep(1)