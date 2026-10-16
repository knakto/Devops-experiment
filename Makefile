NAME	:= meow_haven
TAG		:= v1

IMAGE	:= ${NAME}:${TAG}
PACK_NAME := ${NAME}.tar

## COMMAND ##
DOCKER	:= docker
RM		:= rm -rf

all: build_image pack_image

build_image:
	${DOCKER} build meow_haven -t ${IMAGE}

pack_image:
	${DOCKER} save ${IMAGE} -o ${PACK_NAME}

clean:
	${RM} ${PACK_NAME}

.PHONY: all build_image pack_image clean
