

# coding: utf-8

# In[1]:


from flask import Flask,render_template,request

import pandas as pd

app = Flask(__name__, static_url_path = '')

def r1():
    df=pd.read_excel('./static/Par_DataforLogisticRegression.xlsx',skiprows=2)
    return df['Age'].to_json()
    

@app.route("/")
def index():
    return render_template('Index.html')

@app.route('/age')
def age():
    age=r1()
    return age

if __name__ == '__main__':
    app.run(debug=False)


# In[5]:


df=pd.read_excel('Par_DataforLogisticRegression.xlsx',skiprows=2)
df['Age'].to_json()

