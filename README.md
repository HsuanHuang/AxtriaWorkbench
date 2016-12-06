# AxtriaWorkbench
### Installation & Launch

* Install Python 2.7 and Node.js (version >= 6)

* Open terminal in folder './AxtriaWorkbench/'

* Install impyla
```shell
pip install impyla
```

* Start express server
```shell
npm start
```

* Open the Cloudera cluster, then open chrome browser and go to http://localhost:3000 (Now you should see the webpages)

### Usage

1. Login: default username & password: admin / admin (You can also register a new one)

2. By default, you should be at the query page. The first thing to do is setting up parameters in all five questions.

3. Click 'Submit' and now you should be directed to the report page. Since the query needs some time to run, you have to wait until the results are fetched (DO NOT CLOSE OR REFRESH!). After that, all the results will be displayed automatically.

4. Select 'COHORT' or 'KICKOUT' tab, and click 'Download CSV' to download the data as a csv file.

5. Click Logout to exit.

### Development Guide

* File structure
```
README.md         // Help documentation
package.json      // json file for node modules
login.html        // login page html
server.js         // js file for node.js server
connect.py        // python module for connecting to impala
node_modules      // directory of node.js modules
  |- ......
pages             // directory of web pages
  |- fonts        // directory for fonts
  |- img          // directory for images
  |- app.js       // main js file for angular controller
  |- style.css    // main css file
  |- index.html   // main html file
  |- query.html   // sub html file for query page
  |- report.html  // sub html file for report page
  |- graph.html   // TODO: sub html file for visualization
```

* How to modify

If you'd like to add more queries, you need to modify 3 files. First, add more questions in the query.html. Second, go to app.js and add more
