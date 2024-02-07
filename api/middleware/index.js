exports.middlewareHere = async (req, res, next) => {
    try {
        if(req.header('bearer-token') !== "apitokenwarungalvine"){
            return res.status(401).send({
                message: "Access Denied!",
                code: 401
            })
        }
        next()
    } catch (error) {
        console.log(error);
    }
}