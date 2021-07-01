;(function(global){
    var AddressBook = function(name,phone,email){
      return new AddressBook.init(name,phone,email);
    };
    
    AddressBook.prototype = {
      
      data:[
        
      ],
      searchResults:[
        
      ],
      addNewContact:function(name,phone,email){
       let contacts = localStorage.getItem('contacts')
       let data = {
        name: name,
        phone: phone,
        email:email
      }
       if(contacts){
        let newcontacts = JSON.parse(contacts)
        newcontacts.push(data);
        localStorage.setItem('contacts', JSON.stringify(newcontacts))
       }
       else{
        let newcontacts = [];
        newcontacts.push(data);
        localStorage.setItem('contacts', JSON.stringify(newcontacts))
       }
        return this;
      },
      save:function(){
        
        
      },
      returnAll:function(){
        return this.data;
      },
      displayData:function(){
        this.log(this.data);
        return this;
      },
      log:function(data){
        console.log(data);
        return this;
      },
      search:function(searchTerm){
        if(this.data.length){
          for(var i=0;i<this.data.length;i++){
            if(this.data[i].name.toLowerCase() == searchTerm.toLowerCase()){
              console.error(this.data[i]);
              this.searchResults.push(this.data[i]);
            }
          }
          
          return this.searchResults;
        }else{
          console.log("There are no results");
        }
        return this;
      },
      lastResults:function(){
        return this.searchResults;
      }
    } 
    
    AddressBook.init=function(name,phone,email){
      var self = this;
      
      if(name || phone || email){
        self.addNewContact(name || "", phone||"", email||"");
      }
      
    }
    
    AddressBook.init.prototype = AddressBook.prototype;
   
   global.AddressBook = $ab = AddressBook;
 })(window);
 
 if(!window.contactList){ 
    window.contactList=$ab();
   }
 
 var form  = document.getElementById('contact');
 form.addEventListener('submit', function(){
    if(!window.contactList){ 
    window.contactList=$ab(form.person.value,form.phone.value,form.email.value);
   } else {
   
     contactList.addNewContact(form.person.value,form.phone.value,form.email.value);
   }
   
     form.person.value = '';
     form.phone.value = '';
     form.email.value = '';
   
    event.preventDefault();
 });
 
 var searchForm = document.getElementById('search');
 searchForm.addEventListener('submit', function(){
   var results;
   if(results !== undefined){
     results = null;
   }
   if(!window.contactList){
     window.contactList = $ab();
   }else{
     results = contactList.search(searchForm.search.value);
   }
   document.getElementById('results').innerHTML = '';
   if(results.length>0){
     
     for(var i = 0;i<results.length;i++){
       document.getElementById('results').innerHTML += '<div class="contact-item">Name:'+results[i].name+'<br>Phone:'+results[i].phone+'<br>Email:'+results[i].email+'</div><hr>';
     }
     } else{
    document.getElementById('results').innerHTML += '<div class="contact-item">THERE ARE NO RESULT FOR THIS NAME</div><hr>';
   }
   
   
   event.preventDefault();
 });
 
 document.getElementById('js-show-all').addEventListener('click', function(){
   if(window.contactList){ 
      document.getElementById('show-panel').innerHTML = '';
    var contacts = JSON.parse(localStorage.getItem('contacts'))
  
     if(contacts.length>0){
       for(var i = 0;i<contacts.length;i++){
       document.getElementById('show-panel').innerHTML += '<div class="contact-item">Name:'+contacts[i].name+'<br>Phone:'+contacts[i].phone+'<br>Email:'+contacts[i].email+'</div><hr>';
       }
     }else{
       document.getElementById('show-panel').innerHTML += '<div class="contact-item">You have no contacts. Why not add  a few?</div><hr>';
     }
   }
   document.getElementById('show-panel').style.display = 'block';
   
   document.getElementById('search-panel').style.display = 'none';
   document.getElementById('contact-panel').style.display = 'none';
 });
 
 document.getElementById('js-search').addEventListener('click', function(){
   document.getElementById('show-panel').style.display = 'none';
   document.getElementById('search-panel').style.display = 'block';
   document.getElementById('contact-panel').style.display = 'none';
 });
 
 document.getElementById('js-add-new').addEventListener('click', function(){
   document.getElementById('show-panel').style.display = 'none';
   document.getElementById('search-panel').style.display = 'none';
   document.getElementById('contact-panel').style.display = 'block';
 });
 