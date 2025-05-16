FROM httpd:2.4


COPY src/public/ /usr/local/apache2/htdocs/


# Copie des fichiers dans le dossier ssl du conteneur
COPY ssl/server.crt /usr/local/apache2/conf/ssl/server.crt
COPY ssl/server.key /usr/local/apache2/conf/ssl/server.key

# Copie du fichier de configuration SSL
COPY ssl.conf /usr/local/apache2/conf/extra/httpd-ssl.conf
COPY apache.conf /usr/local/apache2/conf/httpd.conf

# Active le module SSL et inclut la configuration SSL
RUN sed -i '/^#Include conf\/extra\/httpd-ssl.conf/s/^#//' /usr/local/apache2/conf/httpd.conf \
    && sed -i '/^#LoadModule ssl_module modules\/mod_ssl.so/s/^#//' /usr/local/apache2/conf/httpd.conf

EXPOSE 443
