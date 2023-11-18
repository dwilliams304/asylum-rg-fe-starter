import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import CitizenshipMapAll from './Graphs/CitizenshipMapAll';
import CitizenshipMapSingleOffice from './Graphs/CitizenshipMapSingleOffice';
import TimeSeriesAll from './Graphs/TimeSeriesAll';
import OfficeHeatMap from './Graphs/OfficeHeatMap';
import TimeSeriesSingleOffice from './Graphs/TimeSeriesSingleOffice';
import YearLimitsSelect from './YearLimitsSelect';
import ViewSelect from './ViewSelect';
import axios from 'axios';
import { resetVisualizationQuery } from '../../../state/actionCreators';
import { colors } from '../../../styles/data_vis_colors';
import ScrollToTopOnMount from '../../../utils/scrollToTopOnMount';

const { background_color } = colors;

function GraphWrapper(props) {
  const { set_view, dispatch } = props;
  let { office, view } = useParams();
  if (!view) {
    set_view('time-series');
    view = 'time-series';
  }
  let map_to_render;
  if (!office) {
    switch (view) {
      case 'time-series':
        map_to_render = <TimeSeriesAll />;
        break;
      case 'office-heat-map':
        map_to_render = <OfficeHeatMap />;
        break;
      case 'citizenship':
        map_to_render = <CitizenshipMapAll />;
        break;
      default:
        break;
    }
  } else {
    switch (view) {
      case 'time-series':
        map_to_render = <TimeSeriesSingleOffice office={office} />;
        break;
      case 'citizenship':
        map_to_render = <CitizenshipMapSingleOffice office={office} />;
        break;
      default:
        break;
    }
  }

  function updateStateWithNewData(years, view, office, stateSettingCallback) {
    /*
          _                                                                             _
        |                                                                                 |
        |   Example request for once the `/summary` endpoint is up and running:           |
        |                                                                                 |
        |     `${url}/summary?to=2022&from=2015&office=ZLA`                               |
        |                                                                                 |
        |     so in axios we will say:                                                    |
        |                                                                                 |     
        |       axios.get(`${url}/summary`, {                                             |
          |         params: {                                                               |
            |           from: <year_start>,                                                   |
            |           to: <year_end>,                                                       |
        |           office: <office>,       [ <-- this one is optional! when    ]         |
        |         },                        [ querying by `all offices` there's ]         |
        |       })                          [ no `office` param in the query    ]         |
        |                                                                                 |
          _                                                                             _
                                   -- Mack 
                                   
                                   */
    const params = {
      //Create a params object, we will always have these two values
      from: years[0],
      to: years[1],
    };
    if (office !== 'all' || office) {
      params.office = office; //If office isn't set to all or if office does have a value, attach that to the params object
      //(Office isn't required and can be undefined if it doesn't have a value or IS set to 'all')
    }
    const data = []; //Create an empty data array (to match the test_data json blob)
    axios
      .all([
        //Get data from both URLs
        axios.get('https://hrf-asylum-be-b.herokuapp.com/cases/fiscalSummary', {
          //The base API url could be defined somewhere as well :)
          params,
        }),
        axios.get(
          'https://hrf-asylum-be-b.herokuapp.com/cases/citizenshipSummary',
          {
            params,
          }
        ),
      ])
      .then(
        axios.spread((res1, res2) => {
          //When both urls are fetched, grab the response data from each
          data.push(res1.data); //Push the first response from the /fiscalSummary endpoint into the empty array -> this endpoint sends back an object,
          //but the way we get the data everywhere is done as if it's an array (i.e: is done as data[0], rather than just data.value)
          data[0].citizenshipResults = res2.data; //Add the citizenship results to res1.data (because it's an object)
          stateSettingCallback(view, office, data); //Use the newly manipulated data for this function
        })
      )
      .catch(err => console.log(err));

    /* NOTE:
        Everywhere that uses this data is requires it to be an array because values are accessed by 
        grabbing data at a certain index -> data[0]['yearResults'] in rawApiDataToPlotlyReadInfo.js (future proofing in case more data is added to the array?)
        But we're only working with one object -- could be tricky!
    */
  }

  const clearQuery = (view, office) => {
    dispatch(resetVisualizationQuery(view, office));
  };
  return (
    <div
      className="map-wrapper-container"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        minHeight: '50px',
        backgroundColor: background_color,
      }}
    >
      <ScrollToTopOnMount />
      {map_to_render}
      <div
        className="user-input-sidebar-container"
        style={{
          width: '300px',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <ViewSelect set_view={set_view} />
        <YearLimitsSelect
          view={view}
          office={office}
          clearQuery={clearQuery}
          updateStateWithNewData={updateStateWithNewData}
        />
      </div>
    </div>
  );
}

export default connect()(GraphWrapper);
