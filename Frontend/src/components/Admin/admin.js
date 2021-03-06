import React, { Component } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTickets , getBiders , getPages , getAvatars , getRequests , getFreelancers} from '../../actions/postActions';
import axios from 'axios';
import "./admin.css";

var dir = [
  "http://localhost:3000/images/flowback/1.jpg",
  "http://localhost:3000/images/flowback/2.jpg",
  "http://localhost:3000/images/flowback/3.jpg",
  "http://localhost:3000/images/flowback/4.jpg",
  "http://localhost:3000/images/flowback/5.jpg",  
] ;
var i = 0;
var pageinfo = {};
var totalpagenum = 0;
var lastpagenum = 0;

class admin extends Component {
  
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.selectTask = this.selectTask.bind(this);
    this.Post = this.Post.bind(this);
    this.PostTicket = this.PostTicket.bind(this);
    this.nextPagination = this.nextPagination.bind(this);
    this.prevPagination = this.prevPagination.bind(this);
    this.firstPagination = this.firstPagination.bind(this);
    this.lastPagination = this.lastPagination.bind(this);
    this.selectBider = this.selectBider.bind(this);
    this.Award = this.Award.bind(this);
    this.ChangeSelect = this.ChangeSelect.bind(this);
    this.Logout = this.Logout.bind(this);
    this.avatarClick = this.avatarClick.bind(this);
    this.ChangeAvatar = this.ChangeAvatar.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit =  this.onSubmit.bind(this);
    this.Report = this.Report.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onSave = this.onSave.bind(this);
    this.UploadAvatarevent = this.UploadAvatarevent.bind(this);
    this.Uploadavatar = this.Uploadavatar.bind(this);

    this.state = {
      currentTitle: "",
      currentDes: "",
      currentTask: "",
      currentTaskskills: "",
      currentPage: 1,
      currentBidername: "",
      currentBideravatar: "",
      currentAvatarurl: "",
      currentAvatarbudget: 0,
      imgCollection: "",
      feedback: "",
      review: 1,
      currentticket_id: "",
      uploadedArray: "",
    }

    pageinfo.pagenum = this.state.currentPage;
    pageinfo.pagesize = 4;
  }

  componentWillMount() {
    setInterval(this.myFunction, 60000);
    this.props.getPages(pageinfo); 
    // this.props.getTickets();
    axios.get("http://localhost:8000/api/get/cnttickets").then(res => {
      totalpagenum = res.data;
    });
  }
  
  componentWillReceiveProps(nextProps) {

  }

  UploadAvatarevent() {
    var avapostdata = {};
    var avapath = document.getElementById("ava_path").value;
    avapath = avapath.slice(12);
    avapostdata.ava_url = "http://localhost:3000/images/Avatar/" + avapath;
    avapostdata.ava_budget = document.getElementById("ava_price").value;
    avapostdata.ava_level = document.getElementById("ava_level").value;
    axios.post("http://localhost:8000/api/avatars", avapostdata).then(res=>{

      this.props.getAvatars();
      var modal6 = document.getElementById("myModal6");
      modal6.style.display = "none";
    })
    .catch(err => alert("that avatar already exists!"));
  }

  Uploadavatar() {
    var modal6 = document.getElementById("myModal6");
    var span = document.getElementsByClassName("close")[5];

    modal6.style.display = "block";

    span.onclick = function() {
      modal6.style.display = "none";
    }

    window.onclick = function(event) {
      if (event.target == modal6) {
        modal6.style.display = "none";
      }
    }
  }
  onSave(id) {
    var input = document.getElementById(id + '000000');
    var editinput = document.getElementById(id + '111111');
    var select = document.getElementById(id + '222222');
    var editselect = document.getElementById(id + '333333');
    input.setAttribute('style',"display: block; margin-left: 10%;");
    select.setAttribute('style', "display:block; margin-left: 35%;");
    editinput.setAttribute('style',"display:none; border: 3px solid red;");
    editselect.setAttribute('style',"display:none;");
    var updatelancerdata = {};
    updatelancerdata.id = id;
    updatelancerdata.user_id = editinput.value;
    updatelancerdata.access = editselect.value;
    axios.post("http://localhost:8000/api/update/Authuser" , updatelancerdata).then(res=>{
      this.props.getFreelancers();
    })
  }

  onEdit(id) {
    var input = document.getElementById(id + '000000');
    var editinput = document.getElementById(id + '111111');
    var select = document.getElementById(id + '222222');
    var editselect = document.getElementById(id + '333333');
    input.setAttribute('style',"display: none;");
    select.setAttribute('style', "display:none;");
    editinput.setAttribute('style',"display:block; border: 3px solid red;margin-left:120px;");
    editselect.setAttribute('style',"display:block; margin-left: 140px;");
    editinput.value = input.value;
    editselect.value = select.value;
  }



  Report() {
    var Reportdata = {};
    Reportdata.id = this.state.currentticket_id;
    Reportdata.review = document.getElementById("review_area").value;
    Reportdata.feedback = document.getElementById("feedback_area").value;
    axios.post("http://localhost:8000/api/report" , Reportdata).then(res=>{
      alert("Report success");
      var feedbackmodal = document.getElementById("feedback");
      feedbackmodal.setAttribute("style", "display: none; ");
    });
  }

  onFileChange(e) {
        this.setState({ imgCollection: e.target.files });
    }

  onSubmit(e) {
      e.preventDefault()
      var formData = new FormData();
      for (const key of Object.keys(this.state.imgCollection)){
          formData.append('formData', this.state.imgCollection[key]);
      }
      
      axios.post("http://localhost:8000/api/fileupload", formData, {
      }).then(res => {
          this.setState(prevState => ({
            uploadedArray: this.state.uploadedArray + res.data.messages
          }))
          console.log(this.state.uploadedArray);
      }).catch((error) => {
          console.log("this is error" + error);
        })
  }

  ChangeAvatar(id , who , url) {
    var changeavatardata = {};
    changeavatardata.id = id ; 
    changeavatardata.avatar_url = url;
    changeavatardata.request_id = who;
    changeavatardata.value =  document.getElementById(id).value;
    axios.post("http://localhost:8000/api/sellavatar" , changeavatardata).then(res=> {
      var modal4 = document.getElementById("myModal4");
      modal4.setAttribute("style", "display: none;");
      this.props.getRequests(url);
      this.props.getAvatars();
    });
  }

  avatarClick(id , flag , price) {
    if(flag == "1")
      return;
    else {
      var modal = document.getElementById("myModal4");
      var span = document.getElementsByClassName("close")[4];

      modal.style.display = "block";

      span.onclick = function() {
        modal.style.display = "none";
      }

      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
      this.setState({
        "currentAvatarbudget": price,
        "currentAvatarurl": id,
      });
      this.props.getRequests(id);
    }
  }

  Logout() {
    window.location.href = '/';
  }

  goToModal(id) {
    var feedback = document.getElementById("feedback");
    var span = document.getElementsByClassName("close")[3];
    this.setState({
      currentticket_id: id,
    })
    feedback.style.display = "block";

    span.onclick = function() {
      feedback.style.display = "none";
    }

    window.onclick = function(event) {
      if (event.target == feedback) {
        feedback.style.display = "none";
      }
    }
  }

  ChangeSelect(id , user) {
    alert()
    var selectValue = document.getElementById(id).value;
    var ChangeSelectdata = {};
    ChangeSelectdata.id = id;
    ChangeSelectdata.value = selectValue;
    ChangeSelectdata.user = user;
    
    axios.post("http://localhost:8000/api/status/changed" , ChangeSelectdata).then(res =>{
      var maininfo = {};
      maininfo.pagenum = this.state.currentPage;
      maininfo.pagesize = 4;
      this.props.getPages(maininfo);
      if(selectValue == "Complete" || selectValue == "Incomplete" )
        this.goToModal(id);
    })
  }

  Award() {
    var awarddata = {};
    awarddata.ticket_id = this.state.currentTask;
    awarddata.bider_id = this.state.currentBidername;
    awarddata.bider_price = document.getElementById("bidprice_input").value;
    awarddata.bider_deadline = document.getElementById("biddeadline_input").value ;
    awarddata.bider_url = this.state.currentBideravatar;

    axios.post("http://localhost:8000/api/award/ticket" , awarddata).then(res => {
      var maininfo = {};
      maininfo.pagenum = this.state.currentPage;
      maininfo.pagesize = 4;
      this.props.getPages(maininfo);
      var modal = document.getElementById("myModal");
      var modal2 = document.getElementById("myModal2");
      modal.setAttribute("style", "display: none;");
      modal2.setAttribute("style", "display: none;");
    })
  }

  selectBider(data) {
    this.setState({
      currentBideravatar: data.bider_url,
      currentBidername: data.bider_id,
    })

     var modal = document.getElementById("myModal2");
      var span = document.getElementsByClassName("close")[2];

      modal.style.display = "block";

      span.onclick = function() {
        modal.style.display = "none";
      }

      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }

      document.getElementById("biddes").value = data.bid_description;
      document.getElementById("biddeadline_input").value = data.bid_deadline;
      document.getElementById("bidprice_input").value = data.bid_price;
         
  }

  lastPagination() {
    lastpagenum = Math.ceil(totalpagenum / 4);
    this.setState({
      currentPage: lastpagenum, 
    })
    pageinfo.pagenum = lastpagenum;
    pageinfo.pagesize = 4;
    this.props.getPages(pageinfo);
  }

  firstPagination() {
    this.setState({
      currentPage: 1,
    })
    pageinfo.pagenum = 1;
    pageinfo.pagesize = 4;
    this.props.getPages(pageinfo);
  }

  nextPagination() {
    if(this.state.currentPage > (totalpagenum / 4) )
      return;
    this.setState ({
      currentPage: this.state.currentPage + 1,
    });
    pageinfo.pagenum = this.state.currentPage + 1;
    pageinfo.pagesize = 4;
    this.props.getPages(pageinfo);
  }

  prevPagination() {
    if(this.state.currentPage == 1)
      return;
    else {
      this.setState ({
        currentPage: this.state.currentPage - 1,
      });
      pageinfo.pagenum = this.state.currentPage - 1;
      pageinfo.pagesize = 4;
      this.props.getPages(pageinfo);
    }
  }

  PostTicket() {
    let postdata = {};
    postdata.ticket_name = document.getElementById("posttitle").value;
    postdata.ticket_description = document.getElementById("postdes").value;
    postdata.ticket_skills = document.getElementById("postskills").value;
    postdata.ticket_price = document.getElementById("postprice_input").value;
    postdata.ticket_deadline = document.getElementById("postdeadline_input").value;
    postdata.upload = this.state.uploadedArray;

    var modal1 = document.getElementById("myModal1");
    if (postdata.ticket_deadline == "" || postdata.ticket_price == "" || postdata.ticket_skills == "" || postdata.ticket_description == "" || postdata.ticket_name == "")
    {
      alert("All field are Required");
    }
    else {
      axios.post("http://localhost:8000/api/ticket", postdata).then(res=> {
        modal1.setAttribute("style", "display: none;");
        this.props.getTickets();
        var maininfo = {};
        maininfo.pagesize = 5;
        maininfo.pagenum = 1;
        this.props.getPages(maininfo);
      }).catch(err => {
        alert(err);
      })
    }
  }

  Post() {
    var modal = document.getElementById("myModal1");
      var span = document.getElementsByClassName("close")[1];

      modal.style.display = "block";

      span.onclick = function() {
        modal.style.display = "none";
      }

      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
  }
  myFunction() {
    if(i > 4)
      i = i % 5;
    document.getElementById("mainbody1").setAttribute("style", "background-image: url("+ dir[i] +")");
    i++;
  }
  selectTask(id, flag) {
    if(flag != "Not Assigned")
      return;
    else {
      var modal = document.getElementById("myModal");
      var span = document.getElementsByClassName("close")[0];

      modal.style.display = "block";

      span.onclick = function() {
        modal.style.display = "none";
      }

      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
      console.log("selected task id"+ id);
      axios.get("http://localhost:8000/api/get/ticket/" + id ).then(res=>{

        console.log(res.data[0].id);
        this.setState({
          "currentTitle": res.data[0].ticket_name,
          "currentDes": res.data[0].ticket_description,
          "currentTask": res.data[0].id,
          "currentTaskskills": res.data[0].ticket_skills,
        })
        this.props.getBiders(this.state.currentTask);
      })

    }
  }
  onClick(flag) {
    var content1 = document.getElementById("content1");
    var content2 = document.getElementById("content2");
    var content3 = document.getElementById("content3");
    var ticketa = document.getElementById("ticketa");
    var avatara = document.getElementById("avatara");  
    var freea = document.getElementById("freea");  

    switch(flag) {
      case 1:
        content1.setAttribute("style", "display: inline-block;");
        content2.setAttribute("style", "display: none;");
        content3.setAttribute("style", "display: none;");
        ticketa.setAttribute("style", "background-color: black ; color: white;");
        avatara.setAttribute("style", "background-color: #cccccc; color: white;");
        freea.setAttribute("style", "background-color: #cccccc; color: white;");
        break;
      case 2:
        this.props.getAvatars();
        content2.setAttribute("style", "display: inline-block;");
        content1.setAttribute("style", "display: none;");
        content3.setAttribute("style", "display: none;");
        avatara.setAttribute("style", "background-color: black ; color: white;");
        ticketa.setAttribute("style", "background-color: #cccccc; color: white;");
        freea.setAttribute("style", "background-color: #cccccc; color: white;");
        break;
      case 3:
        this.props.getFreelancers();
        content3.setAttribute("style", "display: inline-block;");
        content1.setAttribute("style", "display: none;");
        content2.setAttribute("style", "display: none;");
        avatara.setAttribute("style", "background-color: #cccccc; color: white;"); 
        freea.setAttribute("style", "background-color: black ; color: white;");
        ticketa.setAttribute("style", "background-color: #cccccc; color: white;"); 
        break;
    }
  }

  render() {

    var result = Object.values(this.props.pages);
    const ticketItems = result.map(ticket => (
        <tr className="tr1" key={ticket.id} onClick={() => { this.selectTask(ticket.id , ticket.ticket_status)}} >
          <td className="td1" id="admintabletd"> {ticket.ticket_name} </td>
          <td className="td1" id="admintabletd"> {ticket.ticket_skills} </td>
          <td className="td1" id="admintabletd"> {ticket.ticket_price} </td>
          <td className="td1" id="admintabletd"> {ticket.ticket_deadline} </td>
          <td className="td1" id="admintabletd"> <select id={ticket.id} value={ticket.ticket_status} onChange={()=> {this.ChangeSelect(ticket.id , ticket.ticket_winner)}}>
                                <option value="Not Assigned">Not Assigned</option>
                                <option value="Assigned">Assigned</option>
                                <option value="Progressing">Progressing</option>
                                <option value="Incomplete">Incomplete</option>
                                <option value="Complete">Complete</option>
                              </select></td>
          <td className="td1" id="admintabletd"> <img className="winneravatar" src={ticket.winner_avatar} alt="none" />{ticket.ticket_winner} </td>
          <td className="td1" id="admintabletd"> {ticket.ticket_budget} </td>
          <td className="td1" id="admintabletd"> {ticket.winner_deadline} </td>
        </tr>
      ));
    const biderItems = this.props.biders.map(bider => (
        <tr className="tr1" key={bider._id} onClick={()=>{this.selectBider(bider)}} >
          <td className="td1"><img className="bider_avatar" src={bider.bider_url} alt="none" /> {bider.bider_id}  </td>
          <td className="td1"> {bider.bid_price} </td>
          <td className="td1"> {bider.bid_deadline} </td>
        </tr>
    ));
    //const result1 = Object.values(this.props.asklists);
    const asklistItems2 = this.props.asklists.map(asklist => (
          <tr key={asklist._id}>
            <td className="td1"><img className="bider_avatar" src={asklist.Avatar_url} alt="none" /></td>
            <td className="td1">  { asklist.request_id } </td>
            <td className="td1">
              <select id={asklist.id} value={asklist.status} onChange={()=> {this.ChangeAvatar(asklist.id , asklist.request_id , asklist.Avatar_url )}}>
                <option value="false">false</option>
                <option value="true">true</option>
              </select> 
            </td>
          </tr> 
      ));
    var j = 1;
    const freelancerItems = this.props.freelancers.map(freelancers => (
      <tr className="tr1" key={freelancers.id} >
        <td className="td1">{j++}</td>
        <td className="td1">
          <input id={freelancers.id + '000000'} className="freelancer_id" value={freelancers.user_id} disabled/>
          <input id={freelancers.id + '111111'} className="editidinput" style={{display:'none'}}/>
        </td>
        <td className="td1">{freelancers.user_skypeid}</td>
        <td className="td1">
          <select className="editselect" id={freelancers.id + '222222'} value={freelancers.access}>
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
          <select className="editselect" id={freelancers.id + '333333'} style={{display: 'none'}}>
            <option value="true">true</option>
            <option value="false">false</option>
          </select>  
        </td>
        <td className="td1">
          <button onClick={()=>{this.onEdit(freelancers.id)}}>Edit</button>
          <button onClick={()=>{this.onSave(freelancers.id)}}>Save</button>
        </td>
      </tr>
    ))

   const avatarItems = this.props.avatars.map(Avatar => {  
        if(Avatar.ava_level == "1")
          return <div className="contain_img" key={Avatar._id}><img className="level" src={Avatar.ava_url} alt="loading.." style={{opacity:Avatar.ava_status == "1" ? 0.3:1}}  id={Avatar.ava_url} onClick={() => { this.avatarClick(Avatar.ava_url , Avatar.ava_status , Avatar.ava_budget)}}/></div>      
    });
  const avatarItems1 = this.props.avatars.map(Avatar => {  
        if(Avatar.ava_level == "2")
          return <div className="contain_img" key={Avatar._id}><img className="level" src={Avatar.ava_url} alt="none" style={{opacity:Avatar.ava_status == "1" ? 0.3:1}} id={Avatar.ava_url} onClick={() => { this.avatarClick(Avatar.ava_url , Avatar.ava_status, Avatar.ava_budget)}}/></div>      
    });
  const avatarItems2 = this.props.avatars.map(Avatar => {  
        if(Avatar.ava_level == "3")
          return <div className="contain_img" key={Avatar._id}><img className="level" src={Avatar.ava_url} alt="none" style={{opacity:Avatar.ava_status == "1" ? 0.3:1}} id={Avatar.ava_url} onClick={() => { this.avatarClick(Avatar.ava_url , Avatar.ava_status, Avatar.ava_budget)}}/></div>      
    });
    
    
    return (

      <div className='mainbody1' id="mainbody1">
        <div className="adminheader">
            <div className="adminlogodiv">  </div>
            <div className="adminheaderdiv">Welcome to Admin panel <button className="adminlogoutbtn" id="adminlogoutbtn" onClick={()=>{this.Logout()}}> Logout</button></div>
        </div>
        <div className="contentbody">
          <div className="sidebar1">
            <a onClick={()=>{this.onClick(1)}} className="active" id="ticketa">Tickets</a>
            <a onClick={()=>{this.onClick(2)}} id="avatara">Avatars</a>
            <a onClick={()=>{this.onClick(3)}} id="freea">Freelancers</a>
          </div>
          <div className="contentss content1" id="content1">
              <div className="postdiv"><img className="postimg" src="http://localhost:3000/images/post.png" alt="none" onClick={()=>{this.Post()}} /></div>
              <table className='table1' id="admintable"> 
                <tr className='tableheader1'>
                  <th className='tableth1'>Title</th>
                  <th className='tableth1'>Skills Required</th>
                  <th className='tableth1'>Price</th>
                  <th className='tableth1'>Deadline</th>
                  <th className='tableth1'>Status</th>
                  <th className='tableth1'>Winner</th>
                  <th className='tableth1'>Budget</th>
                  <th className='tableth1'>Winner_deadline</th>
                </tr>
                {ticketItems} 
              </table>
              <div className="footerdiv">
                <div className="pagenumbtngroup">
                  <div className="pageicon firstbtn" onClick={()=>{this.firstPagination()}}></div>
                  <div className="pageicon prevbtn" onClick={()=>{this.prevPagination()}}></div>
                  <div className="pageicon nextbtn" onClick={()=>{this.nextPagination()}}></div>
                  <div className="pageicon lastbtn" onClick={()=>{this.lastPagination()}}></div>
                </div>
              </div>
              <div id="myModal" class="modal1">
                <div class="modal-content1">
                  <div class="modal-header1">
                    <span class="close" onClick={()=>{this.Close()}}>&times;</span>
                    <h2> {this.state.currentTitle} </h2>
                  </div>
                  <div class="modal-body1">
                    <p className="task_des_area">
                      {this.state.currentDes}
                    </p>
                    <p className="task_skill_area">
                      {this.state.currentTaskskills}
                    </p>
                    <div>
                      <table className='table bidlisttable' id="admintable"> 
                        <tr className='tableheader1'>
                          <th className='tableth1'>Who</th>
                          <th className='tableth1'>Budget</th>
                          <th className='tableth1'>Deadline</th>
                        </tr>
                         {biderItems}
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div id="myModal1" class="modal1">
                <div class="modal-content1">
                  <div class="modal-header1">
                    <span class="close" onClick={()=>{this.Close()}}>&times;</span>
                    <h2> Post Ticket! </h2>
                  </div>
                  <div class="modal-body1">
                    <label className="titlelabel">Title</label><input className="posttitle" id="posttitle" />
                    <label className="deslabel">Description</label><textarea className="postdes" id="postdes" />
                    <div>
                      <label className="titlelabel">Skills</label><input className="skills" id="postskills" />
                      <div className="deadline_div">
                        <p className="deadline_label">Deadline:</p>
                        <input className="deadline_input"  placeholder="2000/2/20 EST 20:00" id="postdeadline_input"/>
                      </div>
                      <div className="price_div">
                        <p className="price_label">Budget:</p>
                        <input className="price_input" placeholder="$..." id="postprice_input" />
                      </div>

                      <form onSubmit={this.onSubmit}  encType="multipart/form-data">
                          <div className="form-group">
                              <input type="file" name="imgCollection" onChange={this.onFileChange} multiple />
                          </div>
                          <div className="form-group">
                              <button className="btn btn-primary" type="submit">Upload</button>
                          </div>
                      </form>

                    </div>
                    <div className="modalpostdiv"><button className="modalpostbtn" onClick={()=>{this.PostTicket()}}> Post </button></div>
                  </div>
                </div>
              </div>


              <div id="myModal2" class="modal1">
                <div class="modal-content1">
                  <div class="modal-header1" id="bidermodalheader">
                    <span class="close" onClick={()=>{this.Close()}}>&times;</span>
                    <img className="currentBiderAvatar" src={this.state.currentBideravatar} alt="none" /><h2 className="currentBidername">{this.state.currentBidername}</h2>
                  </div>
                  <div class="modal-body1">
                    <label className="deslabel">Bid Sentence</label><textarea className="postdes" id="biddes" disabled/>
                    <div>
                      <div className="deadline_div">
                        <p className="deadline_label">Deadline:</p>
                        <input className="deadline_input" id="biddeadline_input" disabled/>
                      </div>
                      <div className="price_div">
                        <p className="price_label">Budget:</p>
                        <input className="price_input" id="bidprice_input" disabled/>
                      </div>
                    </div>
                    <div className="modalpostdiv"><button className="modalpostbtn" onClick={()=>{this.Award()}}> Award </button></div>
                  </div>
                </div>
              </div>


              <div id="feedback" class="modal1">
                <div class="modal-content1">
                  <div class="modal-header1">
                    <span class="close" onClick={()=>{this.Close()}}>&times;</span>
                    <h2>Left feedback and review</h2> 
                  </div>
                  <div class="modal-body1">
                    <label className="label feedbacklabel">Feedback</label><textarea className="task_bid_area" id="feedback_area"></textarea>
                    <label className="label">Review</label><input className="price_input" id="review_area" />
                    <div className="feedbackdiv">
                      <button className="Report" onClick={() => {this.Report()}}> Report </button>
                    </div>
                  </div>
                </div>
              </div>

          </div>
          <div className="contentss content2" id="content2">
            <div className='container4'>
              <img className="intro_img premium_img" src="http://localhost:3000/images/premium.png" alt="none" />
              <button className="uploadavatarbtn" onClick={()=>{this.Uploadavatar()}}> Upload New Avatar </button>
              <div className="gallery premium">
                {avatarItems}
              </div>
              <img className="intro_img amateur_img" src="http://localhost:3000/images/amateur.png" alt="none" />
              <div className="gallery Amateur"> 
                {avatarItems1}
              </div>
              <img className="intro_img basic_img" src="http://localhost:3000/images/basic.png" alt="none" />
              <div className="gallery premium"> 
                {avatarItems2}
              </div>
            </div>

            <div id="myModal4" class="modal1">
              <div class="modal-content1">
                <div class="modal-header1">
                  <span class="close" onClick={()=>{this.Close()}}>&times;</span>
                  <img className="avatarshow" src={this.state.currentAvatarurl} alt="none" />
                  <h3 className="avatarpriceshow"> {this.state.currentAvatarbudget}  </h3> 
                </div>
                <div class="modal-body1">
                  <table className='table bidlisttable'> 
                    <tr className='tableheader'>
                      <th className='tableth'>Avatar</th>
                      <th className='tableth'>Who</th>
                      <th className='tableth'>Status</th>
                    </tr>
                    {asklistItems2}
                  </table>
                </div>
              </div>
            </div>

            <div id="myModal6" class="modal1">
              <div class="modal-content1" id="postavatarmodalcontent">
                <div class="modal-header1">
                  <span class="close" onClick={()=>{this.Close()}}>&times;</span>
                  <h3 className="avatarpriceshow"> Upload New Avatar  </h3> 
                </div>
                <div className="modal-body1">
                  <div className="up_ava_eachdiv">
                    <label className="up_ea_la">Path:</label><input className="up_ea_in" type="file" id="ava_path" />
                  </div>
                  <div className="up_ava_eachdiv">
                    <label className="up_ea_la">Price:</label><input className="up_ea_in" id="ava_price" />
                  </div>
                  <div className="up_ava_eachdiv">
                    <label className="up_ea_la">Level:</label><input className="up_ea_in" id="ava_level" />
                  </div>
                  <div className="up_ava_eachdiv">
                    <button className="uploadavatarbtn" onClick={()=>{this.UploadAvatarevent()}}>Post New Avatar </button>
                  </div>
                </div>
              </div>
            </div>


            <div id="permissionmodal" class="modal1">
              <div class="modal-content1">
                <div class="modal-header1">
                  <span class="close" onClick={()=>{this.Close()}}>&times;</span>
                  <img className="avatarshow" src={this.state.currentAvatarurl} alt="none" />
                  <h3 className="avatarpriceshow"> {this.state.currentAvatarbudget}  </h3> 
                </div>
                <div class="modal-body1">
                  <table className='table bidlisttable'> 
                    <tr className='tableheader'>
                      <th className='tableth'>Avatar</th>
                      <th className='tableth'>Who</th>
                      <th className='tableth'>Status</th>
                    </tr>
                    {asklistItems2}
                  </table>
                </div>
              </div>
            </div>

          </div>

          <div className="contentss content3" id="content3">
            <div className='container4'>
              <table className="table freelancertable">
                <tr className="tableheader">
                  <th className="tableth">No</th>
                  <th className="tableth">UserId</th>
                  <th className="tableth">Skype</th>
                  <th className="tableth">Permission</th>
                  <th className="tableth">Setting</th>
                </tr>
                {freelancerItems}
              </table>
            </div>


          </div>
         

        </div>
      </div>
    );
  }
}

admin.propTypes = {
  getTickets: PropTypes.func.isRequired,
  getBiders: PropTypes.func.isRequired,
  getPages: PropTypes.func.isRequired,
  getAvatars: PropTypes.func.isRequired,
  getRequests: PropTypes.func.isRequired,
  getFreelancers: PropTypes.func.isRequired,
  avatars: PropTypes.array.isRequired,
  posts: PropTypes.array.isRequired,
  avatars: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  biders: state.posts.biders,
  posts: state.posts.items,
  pages: state.posts.pages,
  avatars: state.posts.avatars,
  asklists: state.posts.asklists,
  freelancers: state.posts.freelancers,
})

export default connect(mapStateToProps , { getTickets, getBiders , getPages , getAvatars , getRequests , getFreelancers })(admin);




