pipeline {
    agent any

    triggers {
        pollSCM "*/5 * * * *"
    }

    tools {nodejs "NodeJS"}

    stages {
	    stage('Building') {
            steps{
                sh "npm install"
                sh "CI=False npm run build"
            }
        }
        stage("Reset containers"){
            steps{
                script {
                    try {
                        sh "docker compose -f docker-compose.yml --env-file config/test.env down"
                    }
                    finally {}
                }
            }
        }
        stage("Deploy containers") {
            steps {
                sh "docker compose -f docker-compose.yml --env-file config/test.env up -d"
            }
        }
    }
}