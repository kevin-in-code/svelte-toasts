# [2.0.0](https://github.com/kevin-in-code/svelte-toasts/compare/v1.0.2...v2.0.0) (2024-07-13)


### Bug Fixes

* default ToastView to use fixed position, with optional absolute ([05b1cf7](https://github.com/kevin-in-code/svelte-toasts/commit/05b1cf7be8edcb4b920e235fb4d23c847b548e05))
* protect button width styling of toast ([8812933](https://github.com/kevin-in-code/svelte-toasts/commit/8812933d0e44245aea8e177cb589ceefbd838d8d))


### Features

* infer toast body from long toast topic text ([bce3a77](https://github.com/kevin-in-code/svelte-toasts/commit/bce3a7769d9a310ab3d5a35275088443681db1dd))
* use rounded corners on toast buttons ([8d2fb0c](https://github.com/kevin-in-code/svelte-toasts/commit/8d2fb0cc92b91c1a46519f65aa0fa0236b22b3d1))


### BREAKING CHANGES

* A topic provided without a body may now be split
into a shortened topic and body component, if the topic is comprised
of sentences, or comma-separated phrases. To avoid this behaviour,
simply include a body, even if it is empty.

# 1.0.2 (2024-07-10)


### Bug Fixes

    * relative images in readme (#13 (https://github.com/kevin-in-code/svelte-toasts/issues/13)) (c910daa (https://github.com/kevin-in-code/svelte-toasts/commit/c910daa09a597be578612daf2b0cb04ebbc179ee))

# 1.0.1 (2024-07-10)


### Bug Fixes

    * relative images in readme (#12 (https://github.com/kevin-in-code/svelte-toasts/issues/12)) (fd499aa (https://github.com/kevin-in-code/svelte-toasts/commit/fd499aaba212fd51396b2e6d56354f38a508eb5d))


# 1.0.0 (2024-07-10)


### Bug Fixes

    * make package public (#9 (https://github.com/kevin-in-code/svelte-toasts/issues/9)) (ac5b913 (https://github.com/kevin-in-code/svelte-toasts/commit/ac5b913bfa3d64f37c67b0ab4a2729ca56db1c89))
    * update package name (#8 (https://github.com/kevin-in-code/svelte-toasts/issues/8)) (25d8d6c (https://github.com/kevin-in-code/svelte-toasts/commit/25d8d6cef3df6a2ae520cd559f064d993f9bda85))


### Features

    * allow toast edge decoration (#5 (https://github.com/kevin-in-code/svelte-toasts/issues/5)) (1f7f3b0 (https://github.com/kevin-in-code/svelte-toasts/commit/1f7f3b0fd57fe1b44b676b01a4ec0d23dd9faae9))
    * separate design from theme (#4 (https://github.com/kevin-in-code/svelte-toasts/issues/4)) (8f93190 (https://github.com/kevin-in-code/svelte-toasts/commit/8f93190ae052938cdcbda296180b7e65d7af0668))
    * significant improvements in themes and designs (#7 (https://github.com/kevin-in-code/svelte-toasts/issues/7)) (b473014 (https://github.com/kevin-in-code/svelte-toasts/commit/b473014f425b410699aa05d23267876aaead45f5))
