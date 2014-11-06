module.exports = {
    loader: {
        JobLoader: require('./lib/persistence/loader/JobLoader'),
        OrganisationLoader: require('./lib/persistence/loader/OrganisationLoader'),
        UserLoader: require('./lib/persistence/loader/UserLoader'),
        WishLoader: require('./lib/persistence/loader/WishLoader')
    },
    jobs: {
        Mail: require('./lib/backend/MailJob')
    },
    LinkGenerator: require('./lib/util/LinkGenerator')
};