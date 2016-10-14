/**
 * Created by sb0103 on 10/10/16.
 */
function partialRoute(req, res) {
    res.render( 'partials/' + req.name );
}

module.exports = partialRoute;