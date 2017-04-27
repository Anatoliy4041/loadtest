#!/bin/bash

export PROVIDER="http://vbox6:8545"
export ACCOUNT=0x894d5cbd02bf6c669ba17b78dfd398d606f85f78
export COUNT=10
export TRANSACTION_TIMEOUT=20000

node .
