import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-filesinp',
  templateUrl: './filesinp.component.html',
  styleUrls: ['./filesinp.component.scss']
})
export class FilesinpComponent implements OnInit {

  SERVER_URL = "http://localhost:5002/";
  uploadForm: FormGroup; 
  formData:FormData; 
  colData:any;
  allData:any;
  loader:boolean=true;
  column_arr=[];
  btn:boolean=false;
  allDataArr=[];
  keys=[];
  keys_1=[]
  cnt=0;
  bool_check=[];
  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) { }
  
  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
  }
  
  // public captureScreen()  
  // {  
  //   let DATA = this.htmlData.nativeElement;
  //   let doc = new jsPDF();

  //   let handleElement = {
  //     '#editor':function(element,renderer){
  //       return true;
  //     }
  //   };
  //   doc.fromHTML(DATA.innerHTML,15,15,{
  //     'width': 200,
  //     'elementHandlers': handleElement
  //   });

  //   doc.save('angular-demo.pdf');
   
    


     
  // } 
  
  onSubmit(){
    /* For Single File
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('profile').value);
*/

  this.btn=true;
   this.column_arr=[];
   if(this.ext==="x"){
    this.colData="";
    this.str_arr="";

    this.column_arr=[];
    this.strr="";
    this.bool_check=[];
    this.btn_array=[]; 

    this.httpClient.post<any[]>(this.SERVER_URL+"path2", this.both_files).subscribe(
      (res) => {
        this.colData=res;
        for (const i in this.colData) {
          //console.log("Getting values from dict",this.colData[i])
          this.column_arr.push(this.colData[i]);
          this.bool_check.push(false);
        }

      
      console.log("type of coldata-insideeee",typeof(this.colData));
      console.log("colarray-insideeee",(this.column_arr));

    },
      (err) => console.log(err)
    );
    console.log("type of coldata",typeof(this.colData));
    
    //this.getColData();
  }
  else if(this.ext==="c"){
    this.colData="";
    this.str_arr="";
    this.column_arr=[];
    this.strr="";
    this.bool_check=[];
    this.btn_array=[];
    this.httpClient.post<any[]>(this.SERVER_URL+"path1", this.both_files).subscribe(
      (res) => {
        this.colData=res;
        for (const i in this.colData) {
          //console.log("Getting values from dict",this.colData[i])
          this.column_arr.push(this.colData[i]);
          this.bool_check.push(false);
        }

      
      console.log("type of coldata-insideeee",typeof(this.colData));
      console.log("colarray-insideeee",(this.column_arr));

    },
      (err) => console.log(err)
    );

  }
  else if(this.ext==="j"){
    this.colData="";
    this.str_arr="";
    this.column_arr=[];
    this.strr="";
    this.bool_check=[];
    this.btn_array=[];
    this.httpClient.post<any[]>(this.SERVER_URL+"path3", this.both_files).subscribe(
      (res) => {
        this.colData=res;
        for (const i in this.colData) {
          //console.log("Getting values from dict",this.colData[i])
          this.column_arr.push(this.colData[i]);
          this.bool_check.push(false);
        }

      
      console.log("type of coldata-insideeee",typeof(this.colData));
      console.log("colarray-insideeee",(this.column_arr));

    },
      (err) => console.log(err)
    );

  }
}
  strr:String;
  a=["Column Summary","Dataframe Summary","Row Summary",
     "Column Comparison","Columns with Unequal Values or Types",
    "Sample Rows with Unequal Values","Sample Rows Only in File1",
  "Sample Rows Only in File2"]
  public highlight() {
    if(this.strr){
      this.strr= this.strr.replace(new RegExp("-", "gi"), match => {
        return '<span >' +'' + '</span>';
    });
      this.strr= this.strr.replace(new RegExp("DataComPy Comparison", "gi"), match => {
        return '<span class="titleText">' + '         '+match +'         '+ '</span>';
    });

      for(var i in this.a){
    this.strr= this.strr.replace(new RegExp(this.a[i], "gi"), match => {
        return '<span class="highlightText">' + match +'         '+ '</span>';
    });
  }
  for(var i in this.colData){
    this.strr= this.strr.replace(new RegExp(this.colData[i]+" ", "gi"), match => {
        return '<span class="th_text">' + match + '</span>';
    });
  }
  return this.strr;
}
  }
  btn_array=[];
  makeCheckArray(val){
    this.bool_check[val] = !this.bool_check[val];
    console.log(this.bool_check);
  }

  str_arr="";
  ind=[];
  anMsg=""
  showArray(){
    //bool_check arr map coldata
    this.loader=false;
    this.ind=[];
    this.anMsg="";
    this.str_arr=""
    this.strr="";
    this.btn_array=[];
    for(var b in this.bool_check){
           if(this.bool_check[b]){
             this.ind.push(b);
           }
    }
    for (var indd in this.ind){
      this.btn_array.push(this.colData[this.ind[indd]]);
    }
    for(var i in this.btn_array){
      this.str_arr = this.str_arr + ":"+this.btn_array[i]
      console.log("element:",this.str_arr);
    }
    console.log("Stringify array",this.btn_array.toString());

    if(this.str_arr.length>0){
    this.httpClient.post(this.SERVER_URL+"setChecks",this.str_arr).subscribe(

    );
    this.showButtonValue("KuchhNhin :P");

  }
    else if(this.str_arr.length ===0){
      this.anMsg="Please select one or more primary key/s to procees!";
    }

  }
  showButtonValue(val){
    this.strr="";
    this.allData="";
    console.log("button value:",val);
    console.log("array of checkboxes",this.btn_array);

   this.httpClient.post<any>(this.SERVER_URL+"buttons",val).subscribe(
    (res) => {
      this.allData=res;
      this.strr=``+this.allData;

      console.log("new response type:\n",typeof(this.allData));
      console.log("new response :\n",(this.allData));
      console.log("new response :\n",(this.allData[10]));  
      this.loader=true;
    },
      err=>{
        console.log("Error occured",err);
      });

      //Do the displaying things
  }
  makeArray(n: number): any[] {
    return Array(n);
  }
  getColData(){
    this.httpClient.get(this.SERVER_URL+"getColButtons").subscribe(
      (data:any)=>{
           this.colData=data as JSON ;
           console.log("List of columns common in both files",this.colData);
        },
        err=>{
          console.log("I got error:",err);
        }
    );

  }
  file1=""
  file2=""
  btn_state=false;
  msg=""
  ext="";
  
  checkFiles(fileList:FileList){
    console.log(FileList);
    this.btn_state=false;
    this.msg="";

    if(fileList.length > 2 || fileList.length < 2){
      this.msg="You need to select two files of same type for comparison";
      this.btn_state=false;
    }

    else if(fileList.length ===0){
      this.btn_state=false;
      this.msg="No file chosen";
      
    }

    else if(fileList.length ===2){
      var s="";
      var ss="";
      for(var i=fileList[0].name.length-1; i>=0;i--){
        if(fileList[0].name[i] != '.'){
            s=fileList[0].name[i]+s;
        }
        else if(fileList[0].name[i]==='.'){
            break;
        }
    }
    
    for(var i=fileList[1].name.length-1; i>=0;i--){
      if(fileList[1].name[i] != '.'){
          ss=fileList[1].name[i]+ss;
      }
      else if(fileList[1].name[i]==='.'){
          break;
      }
  }
  if(s!=ss){
    this.msg="Files are not of same type. Please choose files with same extension";
    
  }
  else if(s===ss){
    if(s[0]==="x"){
      this.ext="x"; //true for excel
      this.btn_state=true;

    }
    else if(s[0]==='c'){
      this.ext="c"; //false for csv
      this.btn_state=true;

    }
    else if(s[0]==='j'){
      this.ext="j"; //j for json
      this.btn_state=true;

    }
    else if(s[0]!="c" && s[0]!="x" && s[0]!="j" ){
      this.msg="Please choose both files as only excels(.xls,.xlsx) or Comma Seperated Values Files(.csv) or json";
      this.btn_state=false;
    }
  }

    }

  }
  both_files="";
  onFileSelect(a:any){
    // For multiple inputs
    this.btn=false;
    this.both_files="";
    let fileList: FileList = a.target.files;
    console.log("Using target attribute to get something:\n",a.target);
    console.log("FIles liest ",fileList);
    this.checkFiles(fileList);
    this.formData = new FormData();
    this.file1= fileList[0].name;
    this.file2= fileList[1].name;
    this.both_files = this.file1 +":"+this.file2;
    console.log("first file",fileList[0].name)
    console.log("first file",fileList[1])

    for(let i in fileList){
      this.formData.append('file'+i.toString(), fileList[i]);
    this.uploadForm.get('profile').setValue(this.formData[i]);

    }

/*
    if (a.target.files.length > 0) {
      const file = a.target.files[0];
      this.uploadForm.get('profile').setValue(file);
    }*/

  }

 

}
