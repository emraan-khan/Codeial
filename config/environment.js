const development = {
    name: 'development',
    asset_path : './assets',
    session_cookie_key: 'numnumlunglung',
    db: 'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
    
        auth: {
            user: 'imrankhan70565@gmail.com',
            pass: 'emraan@123'
        }
    },
    google_Client_id: "871890371326-ddh1qs7at8tdqm9uioqhen6b8ru19glm.apps.googleusercontent.com",
    google_Client_secret: "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",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_Secret: 'codeial'

}

const production = {
    name: 'production'
}

module.exports = development;