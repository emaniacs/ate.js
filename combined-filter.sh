#!/usr/bin/env bash

FILTER_DIR=$(pwd)/filters
FILTER_FILE=ate.filters.js
echo -n > ${FILTER_FILE}

for file in ${FILTER_DIR}/*.js ; do
    cat ${file} >> ${FILTER_FILE}
done
