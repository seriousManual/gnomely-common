module.exports = {
    loader: {
        JobLoader: require('./lib/persistence/loader/JobLoader'),
        OrganisationLoader: require('./lib/persistence/loader/OrganisationLoader'),
        UserLoader: require('./lib/persistence/loader/UserLoader'),
        WishLoader: require('./lib/persistence/loader/WishLoader'),
        MiscLoader: require('./lib/persistence/loader/MiscLoader')
    },
    jobs: {
        Mail: require('./lib/backend/MailJob'),
        Invite: require('./lib/backend/InviteJob')
    },
    LinkGenerator: require('./lib/util/LinkGenerator')
};