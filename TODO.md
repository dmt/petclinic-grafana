- ~~create Dockerfiles for all the images that need custom config (extend parent, add config files). This removes the need to mount local files, which may interfere with running the compose file on CI systems (definitely doesn't work on BB, still have to check GH)~~ not needed
- ~~recover the docker compose test scripts I previously created to test whether the setup works~~done
- add playwright tests/scripts to create sample data
- see if that can be used for long running k6 tests
- since curl isn't in the image, maybe figure out a different way to healthcheck petclinic