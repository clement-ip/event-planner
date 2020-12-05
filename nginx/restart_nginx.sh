#!/bin/bash

sudo systemctl reload nginx && \
    sudo systemctl restart nginx && \
    sudo systemctl status nginx
