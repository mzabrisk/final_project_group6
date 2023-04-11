# Lung Cancer, C02 Emissions, and Country #

## Overview of Analysis ##
This analysis is based on 4 datasets obtained from kaggle. The Lung Cancer deaths CSV (https://www.kaggle.com/datasets/programmerrdai/cancer?select=lung-cancer-deaths-per-100000-by-sex-1950-2002.csv) contained 4,572 rows of information on country, year, death rates per 100,000 for females, and death rates per 100,000 for males. The cigarette sales CSV https://www.kaggle.com/datasets/programmerrdai/cancer?select=sales-of-cigarettes-per-adult-per-day.csv contained 2,767 rows of data including country, country code, year, and sales of ciegarettes per day per adult average for the year. The C02 emissions CSV https://www.kaggle.com/datasets/ulrikthygepedersen/co2-emissions-by-country contains 13,953 rows on country code, country name, year, and C02 value. We have pulled in other supporting datasets such as country coordinates, GDP, population, and smoking rates but the analysis is still based off these 4 datasets. 
<img width="420" alt="ERD" src="https://user-images.githubusercontent.com/116980760/228714731-8928cd95-c304-4920-9285-df3f3ea223ba.PNG">


### Purpose of Analysis ###
The purpose of the analysis is to determine if cigarette sales and C02 emissions are linked to lung cancer.  

## ETL Process ##
The data was combined into a database. We used both the Pandas Library in Python and PostgreSQL to clean, sort, and merge our data to a state where we could use it for our visualizations and Machine Learning Models.

## Dashboard
We created a webpage to portrey our findings through visualizations and using the mapbox API. The webpage has different tabs of information, with the first giving a background of our analysis, the second utilizing the mapbox API showing countries CO2 emissions, the third gives references to our data sets we are using with a clickable link to read about the data, and the final tab where you are able to select a country to see the change in CO2 emissions, lung cancer deaths, and cigarette sales from 1960 to 2010. 

![homepage_segment2](Images/homepage_segment2.png).
![world_map_segment2](Images/world_map_segment2.png).
![charts_segment2](Images/charts_segment2.png).

## Machine Learning
We started with a unsupervised model using the K-means method and clustering. According to our elbow curve, we decided there should be 4 clusters as shown below. This showed us that we need to normalize our data. Our team has decided that we want to look into incorporating a supervised model such as the random forest regression which we will be looking more into throughout the week. 

![elbow_segment2](Images/elbow_segment2.png).
![3d_scatter_segment2](Images/3d_scatter_segment2.png).


## Challenges
*Finding a Machine Learning model that is right for our data that we can incorporate into our webpage.
*Getting the right data that helps our overall goal of determining if cigarette sales and CO2 emissions are linked to lung cancer. 
## Successes
*Working as a team and making great progress even though we are all on different schedules. 
## Results
This far along in our project it is clear that cigarette sales are linked to lung cancer. Over the last 20 years or so, cigarette sales have gone down, but so has lung cancer deaths. It is a little harder to tell if CO2 emissions have a direct correlation to lung cancer rates, but that is one of the things we wanted to find out so it was worth looking into. 
## Summary
All in all, some things that have popped out to us so far is that CO2 emissions are continuing to rise in most cases. Especially in more developed countries. Another thing that stood out was the fact that cigarette sales have been going down in most countries, and along with that the lung cancer rates have been going down as well. Could this be a direct link to cigarettes, or is it simply an advancment in medicine?