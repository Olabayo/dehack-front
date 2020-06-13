import React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { requestOverview, cancelOverviewRequest,
  receiveOverview } from './profileSlice';

import ProfileApi from './ProfileApi';

import './profile.css';

const mapDispatch = { requestOverview, cancelOverviewRequest, receiveOverview }

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    isLoading: state.profile.fetching,
    profileOverview: state.profile.profileOverview,
    currentUser: state.auth.currentUser
  }
}

let AddEditProfile =  ({isLoading, profileOverview, currentUser, requestOverview, cancelOverviewRequest, receiveOverview}) => {

    const { register: register, handleSubmit: handleSubmit,  errors: errors } = useForm();

    const [profileloaded, setLoaded] = useState(false);

    const [profileResult, setProfileResult] = useState({});

    const [stateList, setStateList] = useState([]);

    const [cityList, setCityList] = useState([]);

    function getOverview(token){
      ProfileApi
          .getOverview(token)
            .then(response => response)
            .then(json => {
              console.log(json);
              setProfileResult(json.overview.profile);
              setStateList(json.state_list);
              setCityList(json.city_list);
            })
            .catch(message => { });
    }

    useEffect(() => {

      if(!profileloaded){
        var userObj = localStorage.getItem('userObj', '');
        if(userObj !== null ){
          var userObjJson = JSON.parse(userObj);
          console.log("Json User Obj", userObjJson);
          let token = "JWT " + userObjJson.access_token
          setLoaded(true)
          getOverview(token)
      }
    }
    });

    function handleStateChange(event){
      if(event.target.value == "0" || event.target.value == 0){
        setCityList([])
      }else{
      ProfileApi
          .getCities(event.target.value)
            .then(response => response)
            .then(json => {
              setCityList(json.cities)

            })
            .catch(message => {

             });
      }
    }

    function postAction(token, data){

      ProfileApi
          .postProfile(token, data)
            .then(response => response)
            .then(json => {
              console.log(json);
              cancelOverviewRequest();
            })
            .catch(message => {
                cancelOverviewRequest();
             });
      }

      function putAction(token, data){

        ProfileApi
            .putProfile(token, data)
              .then(response => response)
              .then(json => {
                console.log(json);
                cancelOverviewRequest();
                setProfileResult(json.profile);
              })
              .catch(message => {
                  cancelOverviewRequest();
               });
        }

    function onSubmit(data){
      if(data.state_id == "0" || data.state_id == 0){
        alert("Pick a state")
      }else{

        var userObj = localStorage.getItem('userObj', '');
        if(userObj !== null ){
          var userObjJson = JSON.parse(userObj);
          console.log("Json User Obj", userObjJson);
          let token = "JWT " + userObjJson.access_token
          if(JSON.stringify(profileResult) === '{}'){
            postAction(token, data);
          }else{
            putAction(token, data);
          }
        }
      }
    }

    return(
        <>
        {/* Page Header Start */}
    <div className="page-header">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="inner-header">
              <h3>Create Resume</h3>
              <span>
                <Link to="/">Home</Link> /
              </span>
              <span>
                <Link to="/profile">Profile</Link> /
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Page Header End */}

    {/* Content section Start */}
    { isLoading
       ?   <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
       :  <div class="not-lds-ring"><div></div><div></div><div></div><div></div></div>
    }
    <section id="content">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-9 col-md-12 col-xs-12">
            <div className="add-resume box">
              <form className="form-ad" onSubmit={handleSubmit(onSubmit)}>
                <h3>Basic information</h3>
                <div className="form-group">
                  <label className="control-label"></label>
                  <label className="control-label">Email</label>
                  <input type="email" name="email" defaultValue={profileResult.email} ref={register({ required: true })} className="form-control" placeholder="Your@domain.com" />
                  {errors.email && <span>This field is required</span>}
                </div>
                <div className="form-group">
                  <label className="control-label">Profession Title</label>
                  <input type="text" className="form-control" name="title" ref={register({ required: false })}  placeholder="Headline (e.g. Front-end developer)"/>
                </div>
                <div className="form-group">
                  <label className="control-label">Description</label>
                  <textarea className="form-control"name="cover_story" defaultValue={profileResult.cover_story} ref={register({ required: true })} rows="7" placeholder="A description or summary about yourself"></textarea>
                  {errors.cover_story && <span>This field is required</span>}
                </div>
                <div className="form-group">
                  <label className="control-label">Linkedin url</label>
                  <input type="text" name="linkedin_url" defaultValue={profileResult.linkedin_url} ref={register({ required: true })} className="form-control"  placeholder="Website address"/>
                  {errors.linkedin_url && <span>This field is required</span>}
                </div>
                <div className="form-group">
                  <label className="control-label">Phone</label>
                  <input type="text" name="phone" defaultValue={profileResult.phone} ref={register({ required: true })} className="form-control"  placeholder="Phone"/>
                  {errors.phone && <span>This field is required</span>}
                </div>
                <div className="form-group">
                  <label className="control-label">Street</label>
                  <input type="text" name="street" defaultValue={profileResult.street} ref={register({ required: true })} className="form-control"  placeholder="Street Address"/>
                  {errors.street && <span>This field is required</span>}
                </div>
                <div className="form-group">
                  <label className="control-label">State</label>
                  {/*
                  <input type="text" name="state_id" defaultValue={profileResult.state_id} ref={register({ required: true })} className="form-control"  placeholder="State"/>
                  {errors.state_id && <span>This field is required</span>}
                  */}
                  <select className="form-control" name="state_id" onChange={handleStateChange}  ref={register({ required: true })}>
                    { profileResult
                      ? <option value="0">Select a state</option>
                      : <option selected value="0">Select a state</option>
                    }
                    { stateList.map((state, i) =>
                      <>
                        { profileResult && profileResult.state_id == state.id
                          ?<option selected value={state.id}>{state.state_name}</option>
                          :<option value={state.id}>{state.state_name}</option>
                        }
                      </>
                    )}
                  </select>
                    {errors.state_id && <span>This field is required</span>}
                </div>
                <div className="form-group">
                  <label className="control-label">City</label>
                  {/*
                  <input type="text" name="city_id" defaultValue={profileResult.city_id} ref={register({ required: true })} className="form-control"  placeholder="City"/>
                  {errors.city_id && <span>This field is required</span>}
                  */}
                  <select className="form-control" name="city_id" ref={register({ required: true })}>
                    { cityList.map((state, i) =>
                      <>
                        { profileResult && profileResult.city_id == state.id
                          ?<option selected value={state.id}>{state.city}</option>
                          :<option value={state.id}>{state.city}</option>
                        }
                      </>
                    )}
                  </select>
                  {errors.city_id && <span>This field is required</span>}
                </div>

                <div className="form-group">
                  <label className="control-label">Zip code</label>
                  <input type="text" name="zip_code" defaultValue={profileResult.zip_code} ref={register({ required: true })} className="form-control"  placeholder="Zip code"/>
                  {errors.zip_code && <span>This field is required</span>}
                </div>
                <button className="btn btn-common">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* Content section End */}
        </>
    );
}

AddEditProfile = connect(mapStateToProps, mapDispatch)(AddEditProfile)
export default AddEditProfile;
