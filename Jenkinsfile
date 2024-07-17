pipeline {
    agent any

    stages {
        stage('Packaging') {
            steps {
                withCredentials([
                    string(credentialsId: 'GOOGLE_CLIENT_ID', variable: 'GOOGLE_CLIENT_ID'),
                    string(credentialsId: 'GOOGLE_CLIENT_SECRET', variable: 'GOOGLE_CLIENT_SECRET'),
                    string(credentialsId: 'NEXTAUTH_SECRET', variable: 'NEXTAUTH_SECRET'),
                    string(credentialsId: 'NEXT_PUBLIC_BASE_URL', variable: 'NEXT_PUBLIC_BASE_URL')
                ]) {
                    sh '''
                        docker build --build-arg GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID} \
                                     --build-arg CLIENT_SECRET=${GOOGLE_CLIENT_SECRET} \
                                     --build-arg SECRET_KEY=${NEXTAUTH_SECRET} \
                                     --pull --rm -f Dockerfile -t flocalbrandfeweb:latest .
                    '''
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                withDockerRegistry(credentialsId: 'dockerhub', url: 'https://index.docker.io/v1/') {
                    sh 'docker tag flocalbrandfeweb:latest chalsfptu/flocalbrandfeweb:latest'
                    sh 'docker push chalsfptu/flocalbrandfeweb:latest'
                }
            }
        }

        stage('Deploy FE to DEV') {
            steps {
                withCredentials([
                    string(credentialsId: 'API_KEY', variable: 'API_KEY'),
                    string(credentialsId: 'AUTH_DOMAIN', variable: 'AUTH_DOMAIN'),
                    string(credentialsId: 'PROJECT_ID', variable: 'PROJECT_ID'),
                    string(credentialsId: 'NEXT_PUBLIC_STORAGE_BUCKET', variable: 'NEXT_PUBLIC_STORAGE_BUCKET'),
                    string(credentialsId: 'MESSAGING_SENDER_ID', variable: 'MESSAGING_SENDER_ID'),
                    string(credentialsId: 'APP_ID', variable: 'APP_ID'),
                    string(credentialsId: 'MEASUREMENT_ID', variable: 'MEASUREMENT_ID'),
                    string(credentialsId: 'NEXT_PUBLIC_API_KEY', variable: 'NEXT_PUBLIC_API_KEY'),
                    string(credentialsId: 'NEXT_PUBLIC_MEASUREMENT_ID', variable: 'NEXT_PUBLIC_MEASUREMENT_ID'),
                    string(credentialsId: 'NEXT_PUBLIC_APP_ID', variable: 'NEXT_PUBLIC_APP_ID'),
                ]) {
                    echo 'Deploying and cleaning'
                    sh 'docker container stop flocalbrandfeweb || echo "this container does not exist"'
                    sh 'echo y | docker system prune'
                    sh '''
                        docker container run -e API_KEY="${API_KEY}" \
                                             -e AUTH_DOMAIN="${AUTH_DOMAIN}" \
                                             -e PROJECT_ID="${PROJECT_ID}" \
                                             -e NEXT_PUBLIC_STORAGE_BUCKET="${NEXT_PUBLIC_STORAGE_BUCKET}" \
                                             -e MESSAGING_SENDER_ID="${MESSAGING_SENDER_ID}" \
                                             -e APP_ID="${APP_ID}" \
                                             -e MEASUREMENT_ID="${MEASUREMENT_ID}" \
                                             -e NEXT_PUBLIC_API_KEY="${NEXT_PUBLIC_API_KEY}" \
                                             -e NEXT_PUBLIC_MEASUREMENT_ID="${NEXT_PUBLIC_MEASUREMENT_ID}" \
                                             -e NEXT_PUBLIC_APP_ID="${NEXT_PUBLIC_APP_ID}" \
                                             -d --name flocalbrandfeweb -p 3000:3000 chalsfptu/flocalbrandfeweb
                    '''
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
