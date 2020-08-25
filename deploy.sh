#!/bin/bash

npx gulp
raco pollen render src
raco pollen publish src dist