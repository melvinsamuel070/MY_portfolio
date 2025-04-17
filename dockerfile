FROM nginx:alpine

# Copy the index.html file
COPY ./index.html /usr/share/nginx/html/index.html
COPY ./css /usr/share/nginx/html/css
COPY ./js /usr/share/nginx/html/js
COPY ./bg /usr/share/nginx/html/bg
COPY ./resume /usr/share/nginx/html/resume
COPY ./pf /usr/share/nginx/html/pf
