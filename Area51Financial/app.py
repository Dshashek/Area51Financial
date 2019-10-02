
# coding: utf-8

# In[1]:


from flask import Flask,render_template,request

import pandas as pd

template_dir = r'C:\Users\bvkka\Desktop\LoanApprover2'

app = Flask(__name__,template_folder=template_dir)

def r1():
    df=pd.read_excel('Par_Data for Logistic Regression.xlsx',skiprows=2)
    return df['Age'].to_json()
    

@app.route("/")
def index():
    return render_template('Index.html')

@app.route('/age',methods = ['POST'])
def age():
    age=r1()
    return age

if __name__ == '__main__':
    app.run()


# In[5]:


df=pd.read_excel('Par_Data for Logistic Regression.xlsx',skiprows=2)
df['Age'].to_json()

