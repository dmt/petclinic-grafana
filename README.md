Use the spring petclinic project to showcase some of the grafana stack and observaibility things in general.

The github action builds a modified version of the spring petclinic project. It will check out the spring petclinic sample project and use open rewrite to add the necessary maven dependencies for tracing and metrics and then add corresponding logback and application config. 

Everything automatically becomes obsolete and outdated the moment you stop looking so we explicitly do fresh petclinic checkouts instead of cloning it and the docker compose file uses `latest` for all the images. Hopefully all of this will raise failures early.

If you want to try this out, run `docker compose up` and look at [the petclinic sample app](http://localhost:8080) and [grafana](http://localhost:3000/)
