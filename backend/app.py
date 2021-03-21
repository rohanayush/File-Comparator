from flask import Flask, request
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from json import dumps
from flask_jsonpify import jsonify
import pandas as pd
from werkzeug.utils import secure_filename
import datacompy



app = Flask(__name__)
api = Api(app)

CORS(app)
col_value=""
pd1=""
pd2=""
checks=[]


def getColButtons(df1,df2):
    global pd1
    global pd2
    pd1=df1 
    pd2=df2
   
    import numpy as np
    a = np.intersect1d(df2.columns, df1.columns)
    a_dic={}
    for i in range(len(a)):
        a_dic[i]=a[i]
    print("a_dict",a_dic)
    print("Trying to get columns",a)
    print("Type of a",type(a))

    return jsonify(a_dic)

@app.route("/")
def hello():
    return jsonify({'text':'Hello World!'})

@app.route('/setChecks', methods=['POST'])
def setChecks():
    global checks
    checks=[]
    a=request.data
    a=a.decode('utf-8')
    print("List is here!",a)
    achecks=a.split(':')
    while("" in achecks):
        achecks.remove("")
    #for unique elements only
    for i in achecks:
        if i not in checks:
            checks.append(i)

    print("After split",checks)
    import json
    
    return ""

@app.route('/buttons', methods=['POST'])
def primary_key():
    # write code for a particular key value which is also column
    qury=request.data
    #qury=qury.decode('utf-8')
    print("Qury",qury)

    compare = datacompy.Compare(
    pd1,
    pd2,
    join_columns=checks,  #You can also specify a list of columns
    abs_tol=0, #Optional, defaults to 0
    rel_tol=0, #Optional, defaults to 0
    df1_name='File1', #Optional, defaults to 'df1'
    df2_name='File2' #Optional, defaults to 'df2'
    )
    #print("Datacompy report:",compare.report())
    #print("COmpare all columns match",compare.all_columns_match())
    print("\n\n Mismatch ",compare.all_mismatch())
    print("\n\n Mismatch  type",type(compare.all_mismatch()))
    print("\n\n unique columns ",compare.df1_unq_columns)
    print("\n\n unique columns type ",type(compare.df1_unq_columns))



    return jsonify(compare.report())
    '''
    big_blob=[]
    print("For buttons -",request.data)
    
    #Find columns for both
    col_total_source=len(pd1.columns)
    col_total_target=len(pd2.columns)
    big_blob.append(col_total_source)
    big_blob.append(col_total_target)

    #Common as True
    common=pd1.where(pd1.values==pd2.values).notna()
    big_blob.append(common.head().to_json())

    
    
    print("Columns pd1",col_total_source)
    print("Columns pd2",col_total_target)
    diff=pd.concat([pd1, pd2]).drop_duplicates(keep=False)
    print("Difference :\n\n", diff)
    print("Difference type:\n\n", type(diff))
    diff.reset_index(inplace=True)
    big_blob.append(diff.to_json())


    



    #Uncommon as true, just for fun
    #uncommon=pd1.where(pd1.values==pd2.values).notna()
    print("Head of common \n \n",common.head())
    #print("Head of Uncommon \n \n",common.head())
    temp_set=[]
    #getting intersection i.e, unique value based on one column
    unique=set(pd1[str(qury)]).intersection(set(pd2[str(qury)]))
    for val in unique:
        temp_set.append(val)

    big_blob.append(temp_set)
    print("Unique values in column ",qury," is:\n \n",unique)
    print("Unique in column \'",qury,"\' of pd1 :\n\n",set(pd1[qury]))
    print("Head of pd1",pd1.head())
    print("Head of pd2",pd2.head())
    #True:Common in both wrt col name
    #False: Different in both wrt col name
    print("\n\n\nQury   :  $",qury,"$\n\n\n")
    summary=pd1[str(qury)].isin(pd2[str(qury)]).value_counts()
    big_blob.append(str(summary[True]))
    big_blob.append(str(summary[False]))

    #big_blob.append(summary)
    print("Summary of column '",qury,"' :\n\n",summary)
    print("**************************************\n Final array of all",big_blob)
    print("\n*****************************\n\ntype of big_blob",type(big_blob))
    print("\n first element of bib_blob\n",big_blob[0])
  
    a_dic={}
    for i in range(len(big_blob)):
        a_dic[i]=big_blob[i]
    print("\n\n in dict\n\n",a_dic)
    return jsonify(a_dic)
    return compare.report()'''

@app.route('/start1', methods=['POST'])
def file_receivee():
    from werkzeug.utils import secure_filename
    #request to get files
    print("Getting from frontend:",request.files)
    ab=request.files
    print("Got from frontend",ab)
    if ab:
        print("Hello ab")
        a=pd.read_csv(ab['file0'])
        b=pd.read_csv(ab['file1'])
        print("a =",a)
        print("b =",b)
        return getColButtons(a,b)
    return ""


@app.route('/path1',methods=['POST'])
def fileName_process1():
    import os
   
    pathh=request.data 
    pathh=str(pathh)
    print(pathh)
    pathh=pathh[2:len(pathh)-1]


    print("pathh",pathh)
    aa=pathh.split(":")
    print("aa:",aa)
    complete_path="C:\\Users\\"+str(os.getlogin()) + "\\Documents\\"
    print("complete path",complete_path)
    a=pd.read_csv(complete_path+ str(aa[0]) ,  engine='python') 
    b=pd.read_csv(complete_path+str(aa[1]),  engine='python') 
    return getColButtons(a,b)

@app.route('/path2',methods=['POST'])
def fileName_process():
    import os
   
    pathh=request.data 
    pathh=str(pathh)
    pathh=pathh[2:len(pathh)-1]


    print("pathh",pathh)
    aa=pathh.split(":")
    complete_path="C:\\Users\\"+str(os.getlogin()) + "\\Documents\\"
    a=pd.read_excel(complete_path+str(aa[0])) 
    b=pd.read_excel(complete_path+str(aa[1])) 
    return getColButtons(a,b)


@app.route('/path3',methods=['POST'])
def fileName_process3():
    import os
   
    pathh=request.data 
    pathh=str(pathh)
    pathh=pathh[2:len(pathh)-1]


    print("pathh",pathh)
    aa=pathh.split(":")
    complete_path="C:\\Users\\"+str(os.getlogin()) + "\\Documents\\"
    a=pd.read_json(complete_path+str(aa[0])) 
    b=pd.read_json(complete_path+str(aa[1])) 
    return getColButtons(a,b)

@app.route('/start', methods=['POST'])
def file_receive():
    from werkzeug.utils import secure_filename
    #request to get files
    print("Getting from frontend:",request.files)
    '''
      # if we deliver filename with : in between
      set a predefined location
      a=C:/Users/UserName/Documents
      upon receiving read files from a+file1 and a+file2
      pd.read_excel(path)

    '''
    ab=request.files
    print(ab)
    if ab:
        print("Hello ab")
        a=pd.read_excel(ab['file0'])
        b=pd.read_excel(ab['file1'])
        print("a =",a)
        print("b =",b)
        return getColButtons(a,b)
        
        
        '''
        Get all columns and display them as tabs with their values--
        -Select that column only and show based on that column

         True entries show un common elements
        c=a.where(a.values!=b.values).notna()

         True entries show  common elements
        c=a.where(a.values==b.values).notna()

         

       
       Link: https://datascience.stackexchange.com/questions/33053/how-do-i-compare-columns-in-different-data-frames

        '''
        

        
    '''file=request.files['file']
    filename = secure_filename(file.filename)
    print(filename)'''
    return ""

@app.route("/say")
def say(data):
    return data+" to Flask"
class Employees(Resource):
    def get(self):
        return {'employees': [{'id':1, 'name':'Balram'},{'id':2, 'name':'Tom'}]} 
  

class Employees_Name(Resource):
    def get(self, employee_id):
        print('Employee id:' + employee_id)
        result = {'data': {'id':1, 'name':'Balram'}}
        return jsonify(result)   
      


api.add_resource(Employees, '/employees') # Route_1

api.add_resource(Employees_Name, '/employees/<employee_id>') # Route_3


if __name__ == '__main__':
   app.run(port=5002)