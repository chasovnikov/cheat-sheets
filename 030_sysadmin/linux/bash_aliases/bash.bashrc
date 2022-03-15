sudo nano ~/.bashrc
# в самый конец добавьте строки:

# color git-branch and two line in terminal
PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[01;33m\]$(__git_ps1)\n\[\033[00m\]\[\033[0;31m\]\$\[\033[0;33m\] '

# запуск новой конфиг-ии
source ./.bashrc


# или
# color git-branch and two line in terminal
PS1='\[\033[0;32m\]\[\033[0m\033[0;32m\]\u\[\033[0;36m\] @ \[\033[0;36m\]\h \w\[\033[0;32m\]$(__git_ps1)\n\[\033[0;32m\]└─\[\033[0m\033[0;32m\] \$\[\033[0m\033[0;32m\] ▶\[\033[0m\] '

# или
# color git-branch and two line in terminal
PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[01;33m\]$(parse_git_branch)\n\[\033[00m\]└─\[\033[0m\033[0;32m\] \$\[\033[0m\] '

# или
# color git-branch in terminal
parse_git_branch() {
  git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/(\1)/'
}
if [ "$color_prompt" = yes ]; then
  PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[01;33m\]$(parse_git_branch)\[\033[00m\]\$ '
else
  PS1='${debian_chroot:+($debian_chroot)}\u@\h:\w$(parse_git_branch)\$ '
fi

# или
# without the second line ===============
function parse_git_branch {
    git branch --no-color 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/(\1)/'
}

function proml {
    local        BLUE="\[\033[0;34m\]"
    local         RED="\[\033[0;31m\]"
    local      YELLOW="\[\033[0;33m\]"
    local   LIGHT_RED="\[\033[1;31m\]"
    local       GREEN="\[\033[0;32m\]"
    local LIGHT_GREEN="\[\033[1;32m\]"
    local  LIGHT_GRAY="\[\033[0;37m\]"
    case $TERM in
        xterm*)
        TITLEBAR='\[\033]0;\u@\h:\w\007\]'
        ;;
        *)
        TITLEBAR=""
        ;;
    esac

PS1="$PS1$YELLOW\$(parse_git_branch)$LIGHT_GRAY"
PS2='> '
PS4='+ '
}

proml
# ===================================