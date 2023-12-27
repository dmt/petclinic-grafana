Use the spring petclinic project to showcase some of the grafana stack and observaibility things in general.

Currently `make.sh` will check out the spring petclinic sample project and use open rewrite to add the necessary maven dependencies for tracing and metrics and then add corresponding logback and application config. 

Everything automatically becomes obsolete and outdated the moment you stop looking so we explicitly do fresh petclinic checkouts instead of cloning it and the docker compose file uses `latest` for all the images. Hopefully all of this will raise failures early.
