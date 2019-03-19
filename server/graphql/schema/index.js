//Dependencies
const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLList,
  GraphQLSchema
} = require('graphql');

//API Paths
const {PATH_BASE, PARAM_LAUNCHES, PARAM_ROCKETS} = require('../../constants');

//Launch Type
const LaunchType = new GraphQLObjectType({
  name: 'Launch',
  fields: () => ({
    flight_number: { type: GraphQLInt },
    mission_name: { type: GraphQLString },
    launch_date_local: { type: GraphQLString },
    launch_site: { type: LaunchSiteType },
    links: { type: LinksType },
    rocket: { type: RocketType },
    launch_success: { type: GraphQLBoolean },
    details: { type: GraphQLString }
  })
});

//LaunchSite Type
const LaunchSiteType = new GraphQLObjectType({
  name: 'LaunchSite',
  fields: () => ({
    site_name: { type: GraphQLString }
  })
});

// Links Type
const LinksType = new GraphQLObjectType({
  name: 'Links',
  fields: () => ({
    mission_patch: { type: GraphQLString }
  })
});

//Rocket Type
const RocketType = new GraphQLObjectType({
  name: 'Rocket',
  fields: () => ({
    rocket_id: { type: GraphQLString },
    rocket_name: { type: GraphQLString },
    description: { type: GraphQLString },
    active: { type: GraphQLBoolean },
    first_flight: { type: GraphQLString },
    wikipedia: { type: GraphQLString },
    height: { type: HeightType },
    diameter: { type: DiameterType },
    mass: { type: MassType },
    engines: { type: EnginesType },
  })
});

//Height Type
const HeightType = new GraphQLObjectType({
  name: 'Height',
  fields: () => ({
    meters: { type: GraphQLFloat },
    feet: { type: GraphQLFloat }
  })
});

//Diameter Type
const DiameterType = new GraphQLObjectType({
  name: 'Diameter',
  fields: () => ({
    meters: { type: GraphQLFloat },
    feet: { type: GraphQLFloat }
  })
});

//Mass Type
const MassType = new GraphQLObjectType({
  name: 'Mass',
  fields: () => ({
    kg: { type: GraphQLInt },
    lb: { type: GraphQLInt }
  })
});

//Engines Type
const EnginesType = new GraphQLObjectType({
  name: 'Engines',
  fields: () => ({
    number: { type: GraphQLInt },
    type: { type: GraphQLString },
    version: { type: GraphQLString },
    propellant_1: { type: GraphQLString },
    propellant_2: { type: GraphQLString }
  })
});

//---------- Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    launches: {
      type: new GraphQLList(LaunchType),
      args: {
        limit: { type: GraphQLInt },
        offset: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios
          .get(`${PATH_BASE}${PARAM_LAUNCHES}?limit=${args.limit}&offset=${args.offset}`)
          .then(res => res.data);
      }
    },
    launch: {
      type: LaunchType,
      args: {
        flight_number: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios
          .get(`${PATH_BASE}${PARAM_LAUNCHES}/${args.flight_number}`)
          .then( res => res.data);
      }
    },
    rockets: {
      type: new GraphQLList(RocketType),
      resolve(parent, args) {
        return axios
          .get(`${PATH_BASE}${PARAM_ROCKETS}`)
          .then(res => res.data);
      }
    },
    rocket: {
      type: RocketType,
      args: {
        rocket_id: { type: GraphQLString}
      },
      resolve(parent, args) {
        return axios
        .get(`${PATH_BASE}${PARAM_ROCKETS}/${args.rocket_id}`)
        .then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({ 
  query: RootQuery 
});





