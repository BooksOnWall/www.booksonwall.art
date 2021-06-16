require('@babel/register');
require('dotenv').config();
const { defineMessages  } = require('react-intl');
const fs = require('fs');
const React = require('react');
const fetch = require('node-fetch');
console.log('get the list of Tags');
const locale = 'en';
const apiURL = process.env.REACT_APP_API;


const getTags = async () => {
  try {
    const fetchMembers = apiURL+'/members?_limit=-1&lang='+locale;
    return await fetch(fetchMembers, {
      crossDomain:true,
      headers: {'Content-Type':'application/json'},
      method: "get"
    })
    .then(response => {
      if (response && !response.ok) { throw new Error(response.statusText);}
      return response.json();
    })
    .then(data => {
        if(data) {
          let skills = [];
          let members = (data.map((m) => m.skills));
          members.map((m,i) => {
            m.map((skill) => {
              skills[skill] = (!skills[skill]) ? skill : skills[skill];
              return skill;
            });
            return m;
          })
          return skills;
        } else {
          console.log('No Data received from the server');
        }
    })
    .catch((error) => {
      // Your error is here!
      if(error) console.log(JSON.stringify(error));
    });

  } catch(e) {
    console.log(e.message);
  }
  return null;
}
const getCategories = async () => {
  try {
    const fetchMembers = apiURL+'/articles?_limit=-1&lang='+locale;
    return await fetch(fetchMembers, {
      crossDomain:true,
      headers: {'Content-Type':'application/json'},
      method: "get"
    })
    .then(response => {
      if (response && !response.ok) { throw new Error(response.statusText);}
      return response.json();
    })
    .then(data => {
        if(data) {
          let categories = [];
          let articles = (data.map((m) => m.categories));
          articles.map((m,i) => {
            m.map((cat) => {
              categories[cat] = (!categories[cat]) ? cat : categories[cat];
              return cat;
            });
            return m;
          })
          return categories;
        } else {
          console.log('No Data received from the server');
        }
    })
    .catch((error) => {
      // Your error is here!
      if(error) console.log(JSON.stringify(error));
    });

  } catch(e) {
    console.log(e.message);
  }
  return null;
}
Promise.all([getTags(),getCategories()]).then(values => {
  const skills = values[0];
  const categories = values[1];
  let en = require('./src/i18n/locales/skills-en.json');
  let fr = require('./src/i18n/locales/skills-fr.json');
  let it = require('./src/i18n/locales/skills-it.json');
  let es = require('./src/i18n/locales/skills-es.json');
  let pt = require('./src/i18n/locales/skills-pt.json');
  let cat_en = require('./src/i18n/locales/categories-en.json');
  let cat_fr = require('./src/i18n/locales/categories-fr.json');
  let cat_it = require('./src/i18n/locales/categories-it.json');
  let cat_es = require('./src/i18n/locales/categories-es.json');
  let cat_pt = require('./src/i18n/locales/categories-pt.json');

  Object.entries(skills).forEach(([key, value]) => {
    let id = key.replace(/\s/g, '_');
    id = id.toLowerCase();
    en[id] = (!en[id]) ? value : en[id];
 });
 Object.entries(categories).forEach(([key, value]) => {
   let id = key.replace(/\s/g, '_');
   id = id.toLowerCase();
   cat_en[id] = (!cat_en[id]) ? value : cat_en[id];
});
 //en.skills = JSON.stringify(en.skills);
 // write english file
 fs.writeFile('./src/i18n/locales/skills-en.json', JSON.stringify(en, null, 4), (err) => {
    if (err) {
        throw err;
    }
});
fs.writeFile('./src/i18n/locales/categories-en.json', JSON.stringify(cat_en, null, 4), (err) => {
   if (err) {
       throw err;
   }
});
console.log('end english locales');
// fr file :

  Object.entries(skills).forEach(([key, value]) => {
    let id = key.replace(/\s/g, '_');
    id = id.toLowerCase();
    fr[id] = (!fr[id]) ? value : fr[id];
 });
 Object.entries(categories).forEach(([key, value]) => {
   let id = key.replace(/\s/g, '_');
   id = id.toLowerCase();
   cat_fr[id] = (!cat_fr[id]) ? value : cat_fr[id];
});
 fs.writeFile('./src/i18n/locales/skills-fr.json', JSON.stringify(fr, null, 4), (err) => {
    if (err) {
        throw err;
    }
    console.log("JSON data is saved.");
});
fs.writeFile('./src/i18n/locales/categories-fr.json', JSON.stringify(cat_fr, null, 4), (err) => {
   if (err) {
       throw err;
   }
   console.log("JSON data is saved.");
});
console.log('end french locales');
// it files
Object.entries(skills).forEach(([key, value]) => {
  let id = key.replace(/\s/g, '_');
  id = id.toLowerCase();

  it[id] = (!it[id]) ? value : it[id];
});
Object.entries(categories).forEach(([key, value]) => {
  let id = key.replace(/\s/g, '_');
  id = id.toLowerCase();

  cat_it[id] = (!cat_it[id]) ? value : cat_it[id];
});
fs.writeFile('./src/i18n/locales/skills-it.json', JSON.stringify(it, null, 4), (err) => {
  if (err) {
      throw err;
  }
});
fs.writeFile('./src/i18n/locales/categories-it.json', JSON.stringify(cat_it, null, 4), (err) => {
  if (err) {
      throw err;
  }
});
console.log('end italian locales');
// es files

Object.entries(skills).forEach(([key, value]) => {
  let id = key.replace(/\s/g, '_');
  id = id.toLowerCase();

  es[id] = (!es[id]) ? value : es[id];
});
Object.entries(categories).forEach(([key, value]) => {
  let id = key.replace(/\s/g, '_');
  id = id.toLowerCase();

  cat_es[id] = (!cat_es[id]) ? value : cat_es[id];
});
fs.writeFile('./src/i18n/locales/skills-es.json', JSON.stringify(es, null, 4), (err) => {
  if (err) {
      throw err;
  }
});
fs.writeFile('./src/i18n/locales/categories-es.json', JSON.stringify(cat_es, null, 4), (err) => {
  if (err) {
      throw err;
  }
});
console.log('end spanish locales');
// it files

Object.entries(skills).forEach(([key, value]) => {
  let id = key.replace(/\s/g, '_');
  id = id.toLowerCase();

  pt[id] = (!pt[id]) ? value : pt[id];
});
Object.entries(categories).forEach(([key, value]) => {
  let id = key.replace(/\s/g, '_');
  id = id.toLowerCase();

  cat_pt[id] = (!cat_pt[id]) ? value : cat_pt[id];
});
fs.writeFile('./src/i18n/locales/skills-pt.json', JSON.stringify(pt, null, 4), (err) => {
  if (err) {
      throw err;
  }
});
fs.writeFile('./src/i18n/locales/categories-pt.json', JSON.stringify(cat_pt, null, 4), (err) => {
  if (err) {
      throw err;
  }
});
console.log('end portugese locales');

}).catch(reason => {
  console.log(reason)
});



  console.log('complete');
