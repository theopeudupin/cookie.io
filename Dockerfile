FROM httpd:2.4
COPY src /usr/local/apache2/htdocs/
COPY conf/httpd.conf /usr/local/apache2/conf/httpd.conf
RUN chmod -R 775 /usr/local/apache2/
EXPOSE 8080