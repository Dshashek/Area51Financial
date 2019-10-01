#!/usr/bin/env python
# coding: utf-8

# In[11]:


#dependencies
from flask import Flask, render_template, redirect

#for postgres connections
import os
import psycopg2


# In[12]:


app = Flask(__name__, static_url_path='')


# In[10]:


@app.route("/")
def index():
    return render_template("template.html")

@app.route("/details")
def details():
    return render_template("details.html")

@app.route("/data")
def data():
    return render_template("data.html")

@app.route("/results")
def results():
    #python code here
    print('coming soon')
    return redirect("/", code=302)


# In[4]:


if __name__ == "__main__":
    app.run(debug=False)


# In[ ]:




