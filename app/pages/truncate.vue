<script setup lang="ts">
const expanded = ref(false);
function handleExpand() {
  expanded.value = true;
}
function handleCollapse() {
  expanded.value = false;
}
</script>

<template>
  <div>
    <div class="demo">
      <section class="card mobile">
        <h3>Skills (Mobile)</h3>

        <TruncateList
          class="list"
          :render-truncator="
            ({ hiddenItemsCount }) =>
              h('div', { class: 'listItem' }, `+${hiddenItemsCount}`)
          "
        >
          <div class="listItem">
            UX
          </div>
          <div class="listItem">
            JavaScript
          </div>
          <div class="listItem">
            TypeScript
          </div>
          <div class="listItem">
            React
          </div>
          <div class="listItem">
            Redux
          </div>
          <div class="listItem">
            GraphQL
          </div>
          <div class="listItem">
            Webpack
          </div>
          <div class="listItem">
            Node.js
          </div>
          <div class="listItem">
            Express
          </div>
          <div class="listItem">
            Firebase
          </div>
          <div class="listItem">
            Git
          </div>
        </TruncateList>
      </section>

      <br>

      <section class="card desktop">
        <h3>Skills (Desktop)</h3>
        <TruncateList
          class="list"
          :render-truncator="
            ({ hiddenItemsCount }) =>
              h('div', { class: 'listItem' }, `+${hiddenItemsCount}`)
          "
        >
          <div class="listItem">
            UX
          </div>
          <div class="listItem">
            JavaScript
          </div>
          <div class="listItem">
            TypeScript
          </div>
          <div class="listItem">
            React
          </div>
          <div class="listItem">
            Redux
          </div>
          <div class="listItem">
            GraphQL
          </div>
          <div class="listItem">
            Webpack
          </div>
          <div class="listItem">
            Node.js
          </div>
          <div class="listItem">
            Express
          </div>
          <div class="listItem">
            Firebase
          </div>
          <div class="listItem">
            Git
          </div>
        </TruncateList>
      </section>
    </div>
    <h2>Playground</h2>
    <p>
      Resize the container below to see the list adapt dynamically.<br>
      Try adding or removing items to test truncation.
    </p>
    <div class="demo">
      <TruncateList
        class="list resizable list"

        :render-truncator="
          ({ hiddenItemsCount }) =>
            h('div', { class: 'listItem' }, `+${hiddenItemsCount}`)
        "
      >
        <div class="listItem">
          foo
        </div>
        <div class="listItem">
          bar
        </div>
        <div class="listItem">
          baz
        </div>
        <div class="listItem">
          qux
        </div>
        <div class="listItem">
          quux
        </div>
        <div class="listItem">
          corge
        </div>
        <div class="listItem">
          grault
        </div>
        <div class="listItem">
          waldo
        </div>
        <div class="listItem">
          fred
        </div>
        <div class="listItem">
          plugh
        </div>
        <div class="listItem">
          xyzzy
        </div>
        <div class="listItem">
          thud
        </div>
      </TruncateList>
    </div>
    <h2>Expandable List</h2>
    <p>
      The truncator can have advanced behavior, such as expanding to show all
      items.<br>
      Click the truncator button to expand or collapse the list.
    </p>
    <div class="demo">
      <TruncateList
        class="list expandable" :class="[expanded ? 'expanded' : '']"
        always-show-truncator
        :render-truncator="
          ({ hiddenItemsCount, truncate }) => {
            if (hiddenItemsCount > 0) {
              return h(
                'button',
                {
                  class: 'expandButton',
                  onClick: () => {
                    handleExpand();
                    // Setting the 'expanded' class sets max-height to none, but the container's height does not update immediately.
                    // This means ResizeObserver will not trigger, since the DOM size change is not synchronous.
                    // Therefore, we need to manually call `truncate()` in nextTick to ensure the layout is recalculated.
                    nextTick(() => {
                      truncate();
                    });
                  },
                },
                `${hiddenItemsCount} more...`,
              );
            }
            else {
              return h(
                'button',
                {
                  class: 'expandButton',
                  onClick: handleCollapse,
                },
                'hide',
              );
            }
          }
        "
      >
        <div class="listItem">
          foo
        </div>
        <div class="listItem">
          bar
        </div>
        <div class="listItem">
          baz
        </div>
        <div class="listItem">
          qux
        </div>
        <div class="listItem">
          quux
        </div>
        <div class="listItem">
          corge
        </div>
        <div class="listItem">
          grault
        </div>
        <div class="listItem">
          waldo
        </div>
        <div class="listItem">
          fred
        </div>
        <div class="listItem">
          plugh
        </div>
        <div class="listItem">
          xyzzy
        </div>
        <div class="listItem">
          thud
        </div>
      </TruncateList>
    </div>
  </div>
</template>

<style>
.demo {
  background-color: #f0f0f0;
  padding: 16px;
}

.card {
  padding: 8px;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.07);
}

.card.mobile {
  max-width: 350px;
}

.card.desktop {
  width: fit-content;
}

.card h3 {
  margin: 8px 4px;
}

.list {
  display: flex;
  flex-wrap: wrap;
  max-height: 74px;
  align-content: flex-start;
  align-items: center;
}

.list > * {
  margin: 4px;
}

.list.resizable {
  width: 300px;
  resize: both;
  background-color: #fff;
  height: 74px;
  max-height: none;
}

.list.expandable {
  width: 300px;
  background-color: #fff;
}

.list.expandable.expanded {
  max-height: none;
}

.listItem {
  display: flex;
  align-items: center;
  height: 28px;
  padding: 0 12px;
  font-size: 14px;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  color: rgba(0, 0, 0, 0.65);
  background-color: #fafafa;
}

.expandButton {
  height: 28px;
  font-size: 14px;
  border: none;
  padding: 0 4px;
  color: #1890ff;
  background-color: transparent;
  cursor: pointer;
}
</style>
