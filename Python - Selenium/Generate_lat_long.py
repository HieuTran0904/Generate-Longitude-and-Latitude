from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
import pandas as pd
from webdriver_manager.chrome import ChromeDriverManager

#Import and read the files
df = pd.read_csv(r'D:\ITAP\Summer Intern\Generate_Lat_Long\university_location_data_original.csv')

#Clean the unnecessary data in this file
z = []
m = df['College'].tolist()
for i in range(len(m)):
    if str(m[i]) == "nan":
        z.append(i)
df.drop(z, inplace=True)
#print(df)

m = df['College'].tolist()
latitude = []
longtitude = []
#Go to latlong.net websites
driver = webdriver.Chrome(ChromeDriverManager().install())
driver.get('https://www.google.com/maps/')

for i in m:
    lat = []
    lon = []
    search = driver.find_element_by_id('searchboxinput')
    search.send_keys(i)
    search.send_keys(Keys.ENTER)
    time.sleep(5)
    t = list(driver.current_url)
    for j in range(len(t)):
        if t[j] == '@':
            j += 1
            while(t[j] != ','):
                lat.append(t[j])
                j += 1
            j += 1
            while(t[j] != ','):
                lon.append(t[j])
                j += 1
            break
    lat = "".join(lat)
    lon = "".join(lon)
    latitude.append(lat)
    longtitude.append(lon)
    search.send_keys(Keys.CONTROL, 'a')
    search.send_keys(Keys.BACKSPACE)

print(latitude)
print(longtitude)




